import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE = "https://ocakturizm.com";
const LOCALES = ["tr", "en", "de", "fr", "es", "ar", "ru"];
const STATIC = ["", "/turlar", "/hakkimizda", "/galeri", "/iletisim", "/ozel-tur-talebi", "/gizlilik-politikasi", "/iade-politikasi"];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: string; _updatedAt: string }[] = await client.fetch(
    `*[_type == "tour" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  );
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const p of STATIC) {
      entries.push({ url: `${BASE}/${locale}${p}`, lastModified: now, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 });
    }
    for (const t of slugs) {
      entries.push({ url: `${BASE}/${locale}/turlar/${t.slug}`, lastModified: new Date(t._updatedAt), changeFrequency: "weekly", priority: 0.8 });
    }
  }
  return entries;
}
