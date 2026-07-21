import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourGallery from "@/components/TourGallery";
import TourDetailClient from "@/components/TourDetailClient";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery, tourDetailQuery, relatedToursQuery } from "@/sanity/lib/queries";
import type { Tour } from "@/sanity/lib/types";
import { getDictionary, type Locale } from "../../dictionaries";
import { translateTourDetail, translateTours } from "@/lib/translateContent";

interface RelatedTour {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string | null;
  days: number;
  price: number;
  oldPrice?: number;
  currency?: string;
  date: string;
  cities: string;
}

export default async function TurDetayPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);

  const [tourRaw, settings] = await Promise.all([
    client.fetch<Tour | null>(tourDetailQuery, { slug }),
    client.fetch(siteSettingsQuery),
  ]);

  if (!tourRaw) notFound();

  const relatedToursRaw = tourRaw.destination
    ? await client.fetch<RelatedTour[]>(relatedToursQuery, {
        slug,
        destSlug: tourRaw.destination.slug.current,
      })
    : [];

  const [tour, relatedTours] = await Promise.all([
    translateTourDetail(tourRaw, lang),
    translateTours(relatedToursRaw as Tour[], lang),
  ]);

  const whatsapp = settings?.whatsapp || "905550130571";
  const whatsappMessage = encodeURIComponent(
    `Merhaba, "${tour.name}" turu hakkında bilgi almak istiyorum.`
  );
  const sym = tour.currency === "USD" ? "$" : tour.currency === "TRY" ? "₺" : "€";

  const galleryImages: string[] =
    tour.galleryUrls && tour.galleryUrls.length > 0
      ? tour.galleryUrls
      : tour.heroImageUrl
        ? [tour.heroImageUrl]
        : tour.imageUrl
          ? [tour.imageUrl]
          : [];

  const localeForNumber = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US";

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href={`/${lang}`} className="hover:text-primary transition-colors">
              {dict.tourDetail.homeBreadcrumb}
            </Link>
            <span>&rsaquo;</span>
            <Link href={`/${lang}/turlar`} className="hover:text-primary transition-colors">
              {dict.tourDetail.toursBreadcrumb}
            </Link>
            {tour.destination && (
              <>
                <span>&rsaquo;</span>
                <Link
                  href={`/${lang}/turlar?destination=${tour.destination.slug.current}`}
                  className="hover:text-primary transition-colors"
                >
                  {tour.destination.name}
                </Link>
              </>
            )}
            <span>&rsaquo;</span>
            <span className="text-primary font-medium truncate max-w-[200px]">
              {tour.name}
            </span>
          </nav>
        </div>

        {/* ===== HERO SECTION: Gallery + Info Side by Side (STM Style) ===== */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Gallery (3/5) */}
            <div className="lg:col-span-3">
              <TourGallery images={galleryImages} tourName={tour.name} />
            </div>

            {/* Right: Title + Info + Price (2/5) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
                {/* Title */}
                <div className="p-6 pb-0">
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                    {tour.name}
                  </h1>

                  {/* Info List (vertical, STM style) */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 text-gray-600">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tour.days} {dict.tourDetail.days}
                      </span>
                      {tour.groupSize && (
                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {dict.tourDetail.maxPeople.replace("{n}", String(tour.groupSize))}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {dict.tourDetail.tourDate}: {tour.date}
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading font-bold text-primary text-base mb-3">
                    {dict.tourDetail.tourPrices}
                  </h3>

                  <div className="text-sm space-y-0 flex-1">
                    <div className="flex justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-600">{dict.tourDetail.doubleRoom}</span>
                      <span className="font-semibold text-primary whitespace-nowrap ml-4">
                        {sym}{tour.price?.toLocaleString(localeForNumber)} {tour.currency || "EUR"}
                      </span>
                    </div>
                    {tour.singlePrice != null && (
                      <div className="flex justify-between py-2.5 border-b border-gray-100">
                        <span className="text-gray-600">{dict.tourDetail.singleRoom}</span>
                        <span className="font-semibold text-primary whitespace-nowrap ml-4">
                          {sym}{tour.singlePrice.toLocaleString(localeForNumber)} {tour.currency || "EUR"}
                        </span>
                      </div>
                    )}
                    {tour.childPrice != null && (
                      <div className="flex justify-between py-2.5 border-b border-gray-100">
                        <span className="text-gray-600">{dict.tourDetail.childPrice}</span>
                        <span className="font-semibold text-primary whitespace-nowrap ml-4">
                          {sym}{tour.childPrice.toLocaleString(localeForNumber)} {tour.currency || "EUR"}
                        </span>
                      </div>
                    )}
                    {tour.infantPrice != null && (
                      <div className="flex justify-between py-2.5 border-b border-gray-100">
                        <span className="text-gray-600">{dict.tourDetail.infantPrice}</span>
                        <span className="font-semibold text-primary whitespace-nowrap ml-4">
                          {sym}{tour.infantPrice.toLocaleString(localeForNumber)} {tour.currency || "EUR"}
                        </span>
                      </div>
                    )}
                  </div>

                  {(tour.childPrice != null || tour.infantPrice != null) && (
                    <p className="text-xs text-gray-400 mt-3">
                      {dict.tourDetail.childNote}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-4 space-y-3">
                    <a
                      href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary hover:bg-gold text-white font-semibold py-3.5 rounded-lg text-center text-sm transition-colors"
                    >
                      {dict.tourDetail.reserve}
                    </a>
                    <a
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`"${tour.name}" hakkında soru sormak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-gold text-white font-semibold py-3.5 rounded-lg text-center text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.694-1.347A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.353 0-4.563-.67-6.435-1.828l-.344-.21-3.202.919.791-3.078-.227-.36A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                      </svg>
                      {dict.tourDetail.askQuestion}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Country Bar (STM style) ===== */}
        {tour.destination && (
          <div className="max-w-6xl mx-auto px-4 pb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{dict.tourDetail.countriesVisited}</span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                {tour.destination.flag} {tour.destination.name}
              </span>
            </div>
          </div>
        )}

        {/* ===== Tur Detaylari (Description) ===== */}
        {tour.description && (
          <div className="max-w-6xl mx-auto px-4 pb-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="font-heading font-bold text-primary text-xl mb-4">
                {dict.tourDetail.tourDetails}
              </h2>
              <p className="text-gray-600 text-sm leading-[1.7]">{tour.description}</p>
            </div>
          </div>
        )}

        {/* ===== Tabs Section ===== */}
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <TourDetailClient
            program={tour.program || []}
            included={tour.included}
            excluded={tour.excluded}
            importantNotes={tour.importantNotes}
            tourFaq={tour.tourFaq}
            tourFileUrl={tour.tourFileUrl}
          />

          {/* Alternatif Turlar */}
          {relatedTours.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading font-bold text-primary text-2xl mb-6">
                {dict.tourDetail.alternativeTours}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTours.map((t) => {
                  const tSym = t.currency === "USD" ? "$" : t.currency === "TRY" ? "₺" : "€";
                  return (
                    <Link
                      key={t._id}
                      href={`/${lang}/turlar/${t.slug.current}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        {t.imageUrl && (
                          <Image
                            src={t.imageUrl}
                            alt={t.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                        <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {t.days} {dict.tourDetail.days}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-semibold text-primary text-base mb-1">
                          {t.name}
                        </h3>
                        <p className="text-gray-400 text-xs mb-2">{t.cities}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-gray-500 text-xs">{t.date}</span>
                          <span className="font-heading font-bold text-gold">
                            {tSym}{t.price?.toLocaleString(localeForNumber)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
    </>
  );
}
