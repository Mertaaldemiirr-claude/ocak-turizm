import translate from "google-translate-api-x";
import fs from "fs";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), ".translation-cache");
const localeMap: Record<string, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
};

function getCachePath(locale: string): string {
  return path.join(CACHE_DIR, `${locale}.json`);
}

function loadCache(locale: string): Record<string, string> {
  try {
    const raw = fs.readFileSync(getCachePath(locale), "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveCache(locale: string, cache: Record<string, string>) {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(getCachePath(locale), JSON.stringify(cache, null, 2));
}

export async function translateText(
  text: string,
  targetLocale: string
): Promise<string> {
  if (!text || !text.trim() || targetLocale === "tr") return text;

  const target = localeMap[targetLocale];
  if (!target) return text;

  const cache = loadCache(targetLocale);
  if (cache[text]) return cache[text];

  try {
    const res = await translate(text, { from: "tr", to: target });
    const translated = res.text;
    cache[text] = translated;
    saveCache(targetLocale, cache);
    return translated;
  } catch {
    return text;
  }
}

export async function translateTexts(
  texts: string[],
  targetLocale: string
): Promise<string[]> {
  if (targetLocale === "tr") return texts;

  const target = localeMap[targetLocale];
  if (!target) return texts;

  const cache = loadCache(targetLocale);
  const uncached: { index: number; text: string }[] = [];

  for (let i = 0; i < texts.length; i++) {
    const t = texts[i];
    if (!t || !t.trim() || cache[t]) continue;
    uncached.push({ index: i, text: t });
  }

  if (uncached.length > 0) {
    try {
      const results = await translate(
        uncached.map((u) => u.text),
        { from: "tr", to: target }
      );
      const resArray = Array.isArray(results) ? results : [results];
      for (let i = 0; i < resArray.length; i++) {
        cache[uncached[i].text] = resArray[i].text;
      }
      saveCache(targetLocale, cache);
    } catch {
      // fallback: return originals
    }
  }

  return texts.map((t) => (t && cache[t]) || t);
}

export async function translateObject<T>(
  obj: T,
  keys: (keyof T)[],
  targetLocale: string
): Promise<T> {
  if (targetLocale === "tr") return obj;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = obj as any;
  const texts = keys.map((k) => (typeof o[k] === "string" ? o[k] : ""));
  const translated = await translateTexts(texts as string[], targetLocale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = { ...obj };
  keys.forEach((k, i) => {
    if (typeof o[k] === "string" && translated[i]) {
      result[k] = translated[i];
    }
  });
  return result as T;
}

export async function translateArray<T>(
  arr: T[],
  keys: (keyof T)[],
  targetLocale: string
): Promise<T[]> {
  if (targetLocale === "tr" || !arr.length) return arr;

  // Collect all texts from all items
  const allTexts: string[] = [];
  for (const item of arr) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o = item as any;
    for (const k of keys) {
      allTexts.push(typeof o[k] === "string" ? o[k] : "");
    }
  }

  const translated = await translateTexts(allTexts, targetLocale);

  return arr.map((item, i) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = { ...item };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o = item as any;
    keys.forEach((k, j) => {
      const idx = i * keys.length + j;
      if (typeof o[k] === "string" && translated[idx]) {
        result[k] = translated[idx];
      }
    });
    return result as T;
  });
}
