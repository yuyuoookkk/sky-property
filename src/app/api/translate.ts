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
  "kuning", "merah", "hijau", "biru", "putih", "hitam",
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
 * Translate an optional text field. Returns empty string if input is empty.
 */
async function translateOptional(
  text: string | undefined,
  from: "id" | "en",
  to: "id" | "en"
): Promise<string> {
  if (!text || text.trim().length === 0) return text || "";
  return translateText(text, from, to);
}

/**
 * Translate an array of detail strings.
 * Translates each item individually to stay within character limits.
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

// Spec fields that should be translated (short text fields)
const SPEC_FIELDS = [
  "zoning",
  "leaseTerm",
  "access",
  "view",
  "status",
  "frontage",
] as const;

/**
 * Auto-translate a listing object.
 * Detects the language of `description` and translates to the other language.
 * Translates: title, description, details, and all spec fields
 * (zoning, leaseTerm, access, view, status, frontage).
 *
 * Stores both versions with _en/_id suffixes for each field.
 * Returns the enriched listing with both language versions.
 */
export async function translateListing<
  T extends Record<string, unknown> & {
    title: string;
    description: string;
    details: string[];
  }
>(listing: T): Promise<T> {
  // Detect language from both title and description for better accuracy
  const combinedText = `${listing.title} ${listing.description}`;
  const sourceLang = detectLanguage(combinedText);
  const targetLang = sourceLang === "id" ? "en" : "id";

  console.log(
    `[translate] Detected language: ${sourceLang}, translating to ${targetLang}`
  );

  // Translate title
  const translatedTitle = await translateText(
    listing.title,
    sourceLang,
    targetLang
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

  // Translate all spec fields
  const specTranslations: Record<string, string> = {};
  for (const field of SPEC_FIELDS) {
    const value = listing[field] as string | undefined;
    if (value && value.trim().length > 0) {
      const translated = await translateOptional(value, sourceLang, targetLang);
      specTranslations[`${field}_${sourceLang}`] = value;
      specTranslations[`${field}_${targetLang}`] = translated;
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // Store both versions
  return {
    ...listing,
    [`title_${sourceLang}`]: listing.title,
    [`title_${targetLang}`]: translatedTitle,
    [`description_${sourceLang}`]: listing.description,
    [`description_${targetLang}`]: translatedDesc,
    [`details_${sourceLang}`]: listing.details,
    [`details_${targetLang}`]: translatedDetails,
    ...specTranslations,
  };
}
