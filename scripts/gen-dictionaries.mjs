// tr.json'dan hedef dil sozluklerini uretir: node scripts/gen-dictionaries.mjs ar ru
import translate from "google-translate-api-x";
import fs from "fs";
import path from "path";

const DICT_DIR = path.join(process.cwd(), "src/app/[lang]/dictionaries");
const tr = JSON.parse(fs.readFileSync(path.join(DICT_DIR, "tr.json"), "utf-8"));

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Kullanim: node scripts/gen-dictionaries.mjs <dil> [<dil>...]");
  process.exit(1);
}

async function translateDeep(obj, to) {
  if (typeof obj === "string") {
    if (!obj.trim()) return obj;
    try {
      const res = await translate(obj, { from: "tr", to });
      // {n} yer tutucusunu cevirinin bozmasina karsi koru
      return res.text.replace(/\{\s*n\s*\}/g, "{n}");
    } catch (e) {
      console.error(`  ceviri hatasi (${to}): "${obj.slice(0, 40)}" -> ${e.message}`);
      return obj;
    }
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (const v of obj) out.push(await translateDeep(v, to));
    return out;
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = await translateDeep(v, to);
    return out;
  }
  return obj;
}

for (const lang of targets) {
  console.log(`${lang} sozlugu uretiliyor...`);
  const result = await translateDeep(tr, lang);
  fs.writeFileSync(
    path.join(DICT_DIR, `${lang}.json`),
    JSON.stringify(result, null, 2) + "\n"
  );
  console.log(`${lang}.json yazildi`);
}
