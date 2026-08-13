import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { translateListing } from "../translate";

const DATA_PATH = path.join(process.cwd(), "src/app/data/listings.json");

function readListings() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeListings(listings: unknown[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(listings, null, 2), "utf-8");
}

/**
 * POST — Translate ALL listings that are missing translation fields.
 * This is a one-time migration endpoint to backfill translations
 * for existing listings that were created before auto-translate was implemented.
 *
 * Only translates listings that don't already have description_en AND description_id.
 */
export async function POST() {
  try {
    const listings = readListings();
    let translatedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i];

      // Skip if already has ALL translations (including spec fields)
      const hasEnTranslation = listing.description_en && listing.details_en && listing.title_en;
      const hasIdTranslation = listing.description_id && listing.details_id && listing.title_id;
      // Check spec fields: if listing has zoning, it should also have zoning_en/zoning_id
      const hasSpecTranslations = (!listing.zoning || (listing.zoning_en && listing.zoning_id))
        && (!listing.access || (listing.access_en && listing.access_id))
        && (!listing.view || (listing.view_en && listing.view_id));

      if (hasEnTranslation && hasIdTranslation && hasSpecTranslations) {
        skippedCount++;
        console.log(`[translate-all] Skipping "${listing.title}" — already translated`);
        continue;
      }

      try {
        console.log(`[translate-all] Translating "${listing.title}" (${i + 1}/${listings.length})...`);
        const enriched = await translateListing(listing);
        listings[i] = enriched;
        translatedCount++;

        // Save after each listing in case of failure partway through
        writeListings(listings);

        // Delay between listings to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.error(`[translate-all] Failed to translate "${listing.title}":`, e);
      }
    }

    return NextResponse.json({
      success: true,
      total: listings.length,
      translated: translatedCount,
      skipped: skippedCount,
    });
  } catch (error) {
    console.error("[translate-all] Error:", error);
    return NextResponse.json(
      { error: "Failed to translate listings" },
      { status: 500 }
    );
  }
}
