import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { getDictionary, type Locale } from "../dictionaries";

const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    "imageUrl": image.asset->url,
    destination-> { name },
    order
  }
`;

export default async function GaleriPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const [images, settings] = await Promise.all([
    client.fetch(galleryQuery),
    client.fetch(siteSettingsQuery),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        {/* Hero */}
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            {dict.galleryPage.title}
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            {dict.galleryPage.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {images.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-sm">{dict.galleryPage.noImages}</p>
              <p className="text-gray-300 text-xs mt-1">{dict.galleryPage.comingSoon}</p>
            </div>
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
