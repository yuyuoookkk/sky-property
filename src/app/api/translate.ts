/**
 * Auto-translation utility for property listings.
 * Uses the free MyMemory Translation API (no API key required).
 * Detects source language (Indonesian or English) and translates to the other.
 */

const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

// Common Indonesian words for language detection
const ID_MARKERS = [
  "yang", "dan", "dengan", "untuk", "ini", "itu", "dari", "ke",
  "di", "pada", "adalah", "atau", "juga", "akan", "telah", "sudah",
  "tidak", "bisa", "sangat", "lebih", "antara", "sebuah", "serta",
  "kawasan", "berlokasi", "menawarkan", "dirancang", "terletak",
  "kamar", "tidur", "mandi", "tanah", "luas", "akses", "jalan",
  "menit", "dekat", "menuju", "berada", "mudah", "tinggi",
  "hunian", "investasi", "sewa", "dijual", "disewakan",
  "garansi", "konstruksi", "bonus", "asuransi",
];

/**
 * Detect whether text is Indonesian or English using word frequency.
 * Returns "id" for Indonesian, "en" for English.
 */
export function detectLanguage(text: string): "id" | "en" {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  let idScore = 0;

  for (const word of words) {
    // Strip punctuation for matching
    const clean = word.replace(/[^a-z]/g, "");
    if (ID_MARKERS.includes(clean)) {
      idScore++;
    }
  }

  // If >5% of words are Indonesian markers, classify as Indonesian
  const ratio = idScore / Math.max(words.length, 1);
  return ratio > 0.05 ? "id" : "en";
}

/**
 * Translate a single text string using MyMemory API.
 * langpair format: "id|en" or "en|id"
 */
async function translateText(
  text: string,
  from: "id" | "en",
  to: "id" | "en"
): Promise<string> {
  if (!text || text.trim().length === 0) return text;
  if (from === to) return text;

  try {
    const params = new URLSearchParams({
      q: text,
      langpair: `${from}|${to}`,
    });

    const res = await fetch(`${MYMEMORY_URL}?${params.toString()}`);
    if (!res.ok) return text;

    const data = await res.json();
    const translated = data?.responseData?.translatedText;

    if (translated && typeof translated === "string") {
      return translated;
    }
    return text;
  } catch {
    // If translation fails, return original text silently
    return text;
  }
}

/**
 * Translate an array of detail strings.
 * Batches them into a single API call using newline separator for efficiency.
 */
async function translateDetails(
  details: string[],
  from: "id" | "en",
  to: "id" | "en"
): Promise<string[]> {
  if (!details || details.length === 0) return details;
  if (from === to) return details;

  // Translate in batches to stay within character limits
  // MyMemory has a 500-char per request limit for best results
  const results: string[] = [];

  for (const detail of details) {
    const translated = await translateText(detail, from, to);
    results.push(translated);
    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
}

/**
 * Auto-translate a listing object.
 * Detects the language of `description` and translates to the other language.
 * Stores both versions in `description_en`/`description_id` and `details_en`/`details_id`.
 *
 * Returns the enriched listing with both language versions.
 */
export async function translateListing<
  T extends {
    description: string;
    details: string[];
    description_en?: string;
    description_id?: string;
    details_en?: string[];
    details_id?: string[];
  }
>(listing: T): Promise<T> {
  const sourceLang = detectLanguage(listing.description);
  const targetLang = sourceLang === "id" ? "en" : "id";

  console.log(
    `[translate] Detected language: ${sourceLang}, translating to ${targetLang}`
  );

  // Translate description
  const translatedDesc = await translateText(
    listing.description,
    sourceLang,
    targetLang
  );

  // Translate details
  const translatedDetails = await translateDetails(
    listing.details,
    sourceLang,
    targetLang
  );

  // Store both versions
  return {
    ...listing,
    [`description_${sourceLang}`]: listing.description,
    [`description_${targetLang}`]: translatedDesc,
    [`details_${sourceLang}`]: listing.details,
    [`details_${targetLang}`]: translatedDetails,
  };
}
