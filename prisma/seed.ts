/**
 * Seed script: imports all existing listings from listings.json into SQLite.
 * Safe to run multiple times — uses upsert by slug.
 *
 * Usage: npx tsx prisma/seed.ts
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface JsonListing {
  id?: number;
  slug: string;
  type: string;
  title: string;
  location: string;
  price: string;
  images: string[];
  description: string;
  details: string[];
  landArea: string;
  zoning?: string;
  leaseTerm?: string;
  minRental?: string;
  access?: string;
  view?: string;
  status?: string;
  frontage?: string;
  title_en?: string;
  title_id?: string;
  description_en?: string;
  description_id?: string;
  details_en?: string[];
  details_id?: string[];
  zoning_en?: string;
  zoning_id?: string;
  leaseTerm_en?: string;
  leaseTerm_id?: string;
  access_en?: string;
  access_id?: string;
  view_en?: string;
  view_id?: string;
  status_en?: string;
  status_id?: string;
  frontage_en?: string;
  frontage_id?: string;
}

async function main() {
  // Try multiple paths — works both locally and on VPS
  const possiblePaths = [
    path.join(process.cwd(), "src/app/data/listings.json"),
    path.join(process.cwd(), "listings.json"),
  ];

  let jsonPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      jsonPath = p;
      break;
    }
  }

  if (!jsonPath) {
    console.error("❌ Could not find listings.json");
    process.exit(1);
  }

  console.log(`📂 Reading listings from: ${jsonPath}`);
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const listings: JsonListing[] = JSON.parse(raw);
  console.log(`📋 Found ${listings.length} listings to import`);

  let imported = 0;
  let updated = 0;

  for (const listing of listings) {
    const data = {
      slug: listing.slug,
      type: listing.type,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      images: JSON.stringify(listing.images),
      description: listing.description || "",
      details: JSON.stringify(listing.details || []),
      landArea: listing.landArea || "",
      zoning: listing.zoning || null,
      leaseTerm: listing.leaseTerm || null,
      minRental: listing.minRental || null,
      access: listing.access || null,
      view: listing.view || null,
      status: listing.status || null,
      frontage: listing.frontage || null,
      // Bilingual fields
      titleEn: listing.title_en || null,
      titleId: listing.title_id || null,
      descriptionEn: listing.description_en || null,
      descriptionId: listing.description_id || null,
      detailsEn: listing.details_en ? JSON.stringify(listing.details_en) : null,
      detailsId: listing.details_id ? JSON.stringify(listing.details_id) : null,
      zoningEn: listing.zoning_en || null,
      zoningId: listing.zoning_id || null,
      leaseTermEn: listing.leaseTerm_en || null,
      leaseTermId: listing.leaseTerm_id || null,
      accessEn: listing.access_en || null,
      accessId: listing.access_id || null,
      viewEn: listing.view_en || null,
      viewId: listing.view_id || null,
      statusEn: listing.status_en || null,
      statusId: listing.status_id || null,
      frontageEn: listing.frontage_en || null,
      frontageId: listing.frontage_id || null,
    };

    const existing = await prisma.listing.findUnique({
      where: { slug: listing.slug },
    });

    if (existing) {
      await prisma.listing.update({
        where: { slug: listing.slug },
        data,
      });
      updated++;
      console.log(`  🔄 Updated: ${listing.title}`);
    } else {
      await prisma.listing.create({ data });
      imported++;
      console.log(`  ✅ Imported: ${listing.title}`);
    }
  }

  console.log(`\n🎉 Done! ${imported} imported, ${updated} updated.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
