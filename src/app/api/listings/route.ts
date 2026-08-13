import { NextRequest, NextResponse } from "next/server";
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

// GET — return all listings
export async function GET() {
  const listings = readListings();
  return NextResponse.json(listings);
}

// POST — add a new listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const listings = readListings();

    // Auto-assign ID
    const maxId = listings.reduce(
      (max: number, l: { id: number }) => Math.max(max, l.id),
      0
    );
    body.id = maxId + 1;

    // Auto-generate slug if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Auto-translate description and details
    let enrichedBody = body;
    try {
      if (body.description && body.description.trim().length > 0) {
        enrichedBody = await translateListing(body);
      }
    } catch (e) {
      console.error("[listings] Translation failed, saving without translations:", e);
    }

    listings.push(enrichedBody);
    writeListings(listings);

    return NextResponse.json(enrichedBody, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 400 }
    );
  }
}

// PUT — update an existing listing
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const listings = readListings();
    const index = listings.findIndex(
      (l: { id: number }) => l.id === body.id
    );

    if (index === -1) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Check if description or details changed — re-translate if so
    const existing = listings[index];
    let updatedBody = { ...existing, ...body };

    const titleChanged = body.title && body.title !== existing.title;
    const descChanged = body.description && body.description !== existing.description;
    const detailsChanged = body.details && JSON.stringify(body.details) !== JSON.stringify(existing.details);

    if (titleChanged || descChanged || detailsChanged) {
      try {
        updatedBody = await translateListing(updatedBody);
      } catch (e) {
        console.error("[listings] Translation on update failed:", e);
      }
    }

    listings[index] = updatedBody;
    writeListings(listings);

    return NextResponse.json(listings[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 400 }
    );
  }
}

// DELETE — remove a listing by ID (passed as query param)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "Missing listing ID" },
        { status: 400 }
      );
    }

    const listings = readListings();
    const filtered = listings.filter(
      (l: { id: number }) => l.id !== id
    );

    if (filtered.length === listings.length) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    writeListings(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 400 }
    );
  }
}
