import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import fs from "fs";
import path from "path";

const ASSETS_DIR = path.join(process.cwd(), "public/assets");

/**
 * General-purpose .txt parser for property listings.
 * Works with land, villa, house, or any property type.
 * Extracts key-value pairs, bullet features, description, and price
 * from free-form Indonesian/English text.
 */
function parseTxtListing(raw: string): Record<string, unknown> {
  const lines = raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim());

  const result: Record<string, unknown> = {};
  const details: string[] = [];

  // --- 1. Title: first non-empty line ---
  const titleLine = lines.find((l) => l.length > 0);
  if (titleLine) {
    // Clean common suffixes like "– Luxury Freehold Villa for Sale, Ungasan"
    result.title = titleLine;
  }

  // --- 2. Detect type (sale vs lease) from keywords anywhere in text ---
  const fullText = raw.toLowerCase();
  const saleKeywords = ["dijual", "for sale", "freehold", "shm", "hak milik", "harga jual"];
  const leaseKeywords = ["disewakan", "for lease", "leasehold", "hak sewa", "per are", "/ are", "/are"];
  const saleScore = saleKeywords.filter((k) => fullText.includes(k)).length;
  const leaseScore = leaseKeywords.filter((k) => fullText.includes(k)).length;
  result.type = saleScore > leaseScore ? "sale" : "lease";

  // --- 3. Extract key-value pairs using flexible keyword matching ---
  // Maps common keywords (ID & EN) to our Property fields
  const fieldMappings: Array<{ keys: string[]; field: string }> = [
    { keys: ["lokasi", "location", "alamat", "address"], field: "location" },
    { keys: ["luas tanah", "land area", "total land", "land size"], field: "landArea" },
    { keys: ["luas bangunan", "building area", "building size"], field: "buildingArea" },
    { keys: ["zonasi", "zoning", "zona"], field: "zoning" },
    { keys: ["sertifikat", "certificate", "status kepemilikan", "ownership"], field: "status" },
    { keys: ["masa sewa", "lease term", "jangka waktu", "rental period"], field: "leaseTerm" },
    { keys: ["minimal sewa", "min rental", "minimum lease", "min lease"], field: "minRental" },
    { keys: ["akses", "access", "akses jalan", "road access"], field: "access" },
    { keys: ["view", "pemandangan", "hadap", "facing", "orientation"], field: "view" },
    { keys: ["muka jalan", "frontage", "lebar jalan", "road width"], field: "frontage" },
    { keys: ["nama properti", "property name", "nama villa", "nama"], field: "propertyName" },
  ];

  for (const line of lines) {
    if (!line || line.length < 3) continue;

    // Check for "Key: Value" pattern
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && colonIdx < line.length - 1) {
      const rawKey = line.substring(0, colonIdx).toLowerCase().replace(/[^\w\s]/g, "").trim();
      const rawValue = line.substring(colonIdx + 1).trim();

      if (rawValue) {
        for (const mapping of fieldMappings) {
          if (mapping.keys.some((k) => rawKey.includes(k))) {
            result[mapping.field] = rawValue;
            break;
          }
        }
      }
    }
  }

  // --- 4. Extract price ---
  // Look for lines containing Rp or IDR followed by numbers
  const pricePatterns = [
    /(?:harga\s*(?:jual|sewa)?[:\s]*)?(?:rp\.?\s*[\d.,]+(?:\s*(?:m|jt|juta|miliar|b|milyar|rb|ribu))?(?:\s*\/\s*\w+)*)/i,
    /(?:idr\.?\s*[\d.,]+)/i,
    /(?:rp\.?\s*[\d.,]+)/i,
  ];
  for (const line of lines) {
    if (result.price) break;
    for (const pattern of pricePatterns) {
      const match = line.match(pattern);
      if (match) {
        // Use the full line if it's short (just price), otherwise just the match
        result.price = line.length < 60 ? line : match[0];
        break;
      }
    }
  }

  // --- 5. Collect detail/feature lines ---
  // Lines starting with emoji, bullet chars, checkmarks, or "±"
  const featurePattern = /^(?:[📐🏠🛏🛁🚻🛋🍽🍴🎮🧺📦🏊☀🚿🌿🚗⚡💧📍🌴🏖📈✅🔑💎🏡🏗️⭐🌊🏔️🌅🔒🛡️♻️🎯🏢🏨]|[-•●◆★→➤►✓✔☑]|±|\d+[.)]\s)/;
  
  for (const line of lines) {
    if (!line || line.length < 3) continue;
    if (featurePattern.test(line)) {
      // Clean the emoji/bullet prefix for a cleaner detail
      const cleaned = line.replace(/^[^\w\s±(]+\s*/, "").trim();
      if (cleaned.length > 2) {
        details.push(cleaned);
      }
    }
  }
  result.details = details;

  // --- 6. Extract description ---
  // Find the longest paragraph-style text (>80 chars, not a key:value line)
  let bestDesc = "";
  for (const line of lines) {
    if (line.length > 80 && !line.includes(":") && !featurePattern.test(line)) {
      if (line.length > bestDesc.length) {
        bestDesc = line;
      }
    }
  }
  // Also check first paragraph after title (common pattern)
  if (!bestDesc) {
    const firstNonEmpty = lines.findIndex((l) => l.length > 0);
    if (firstNonEmpty >= 0) {
      for (let i = firstNonEmpty + 1; i < lines.length; i++) {
        if (lines[i].length > 50) {
          bestDesc = lines[i];
          break;
        }
      }
    }
  }
  result.description = bestDesc;

  // Use propertyName as title if we found one (it's usually cleaner)
  if (result.propertyName && typeof result.propertyName === "string") {
    result.title = result.propertyName;
    delete result.propertyName;
  }

  // If landArea came from a line like "📐 Luas Tanah: 255 m²", remove it from details
  // Same for buildingArea — deduplicate extracted fields from the details list
  const landVal = result.landArea as string;
  const buildVal = result.buildingArea as string;
  const filtered = details.filter((d) => {
    if (landVal && d.toLowerCase().includes("luas tanah")) return false;
    if (buildVal && d.toLowerCase().includes("luas bangunan")) return false;
    return true;
  });

  // Add buildingArea as the first detail if present
  if (buildVal) {
    filtered.unshift(`Luas Bangunan: ${buildVal}`);
    delete result.buildingArea;
  }

  result.details = filtered;

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const zip = await JSZip.loadAsync(buffer);

    // Derive folder name from ZIP filename
    const zipName = file.name.replace(/\.zip$/i, "");
    const folderSlug = zipName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const outputDir = path.join(ASSETS_DIR, folderSlug);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Extract files
    const extractedImages: string[] = [];
    let infoData: Record<string, unknown> | null = null;
    let txtData: Record<string, unknown> | null = null;

    const entries = Object.entries(zip.files);

    for (const [filePath, zipEntry] of entries) {
      if (zipEntry.dir) continue;

      const fileName = path.basename(filePath);
      if (!fileName || fileName.startsWith(".")) continue;

      const lowerName = fileName.toLowerCase();

      // Check for info.json (structured data — highest priority)
      if (lowerName === "info.json") {
        const content = await zipEntry.async("string");
        try {
          infoData = JSON.parse(content);
        } catch {
          /* ignore bad JSON */
        }
        continue;
      }

      // Check for .txt files (free-form listing info)
      if (lowerName.endsWith(".txt")) {
        const content = await zipEntry.async("string");
        txtData = parseTxtListing(content);
        continue;
      }

      // Check for image files
      if (/\.(jpe?g|png|webp|avif|gif)$/i.test(lowerName)) {
        const data = await zipEntry.async("nodebuffer");
        const outPath = path.join(outputDir, fileName);
        fs.writeFileSync(outPath, data);
        extractedImages.push(`/api/assets/${folderSlug}/${fileName}`);
      }
    }

    // Sort images numerically (1.jpeg, 2.jpeg, ...)
    extractedImages.sort((a, b) => {
      const numA = parseInt(path.basename(a).match(/(\d+)/)?.[1] || "0");
      const numB = parseInt(path.basename(b).match(/(\d+)/)?.[1] || "0");
      return numA - numB;
    });

    // Priority: info.json > .txt > fallback from zip name
    const parsed = infoData || txtData || {};

    const autoTitle = zipName
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const result = {
      title: (parsed.title as string) || autoTitle,
      slug: (parsed.slug as string) || folderSlug,
      type: (parsed.type as string) || "lease",
      location: (parsed.location as string) || "",
      price: (parsed.price as string) || "",
      images: extractedImages,
      description: (parsed.description as string) || "",
      details: (parsed.details as string[]) || [],
      landArea: (parsed.landArea as string) || "",
      zoning: (parsed.zoning as string) || "",
      leaseTerm: (parsed.leaseTerm as string) || "",
      minRental: (parsed.minRental as string) || "",
      access: (parsed.access as string) || "",
      view: (parsed.view as string) || "",
      status: (parsed.status as string) || "",
      frontage: (parsed.frontage as string) || "",
      folderSlug,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process ZIP file" },
      { status: 500 }
    );
  }
}
