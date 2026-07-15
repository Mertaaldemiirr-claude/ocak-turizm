import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourDetailClient from "@/components/TourDetailClient";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery, tourDetailQuery, relatedToursQuery } from "@/sanity/lib/queries";
import type { Tour } from "@/sanity/lib/types";

interface RelatedTour {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string | null;
  days: number;
  price: number;
  oldPrice?: number;
  date: string;
  cities: string;
}

export default async function TurDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [tour, settings] = await Promise.all([
    client.fetch<Tour | null>(tourDetailQuery, { slug }),
    client.fetch(siteSettingsQuery),
  ]);

  if (!tour) notFound();

  const relatedTours = tour.destination
    ? await client.fetch<RelatedTour[]>(relatedToursQuery, {
        slug,
        destSlug: tour.destination.slug.current,
      })
    : [];

  const whatsapp = settings?.whatsapp || "905551234567";
  const whatsappMessage = encodeURIComponent(
    `Merhaba, "${tour.name}" turu hakkinda bilgi almak istiyorum.`
  );

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/turlar" className="hover:text-primary transition-colors">
              Turlar
            </Link>
            {tour.destination && (
              <>
                <span>/</span>
                <Link
                  href={`/turlar?destination=${tour.destination.slug.current}`}
                  className="hover:text-primary transition-colors"
                >
                  {tour.destination.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-primary font-medium truncate max-w-[200px]">
              {tour.name}
            </span>
          </nav>
        </div>

        {/* Tour Header */}
        <div className="max-w-6xl mx-auto px-4 pt-2 pb-6">
          {tour.destination && (
            <p className="text-gold text-sm font-medium mb-1">
              {tour.destination.flag} {tour.destination.name}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3">
            {tour.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {tour.date}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tour.days} Gun
            </span>
            {tour.cities && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {tour.cities}
              </span>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol - Icerik */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery + Tabs (Client Component) */}
              <TourDetailClient
                program={tour.program || []}
                importantNotes={tour.importantNotes}
                tourFaq={tour.tourFaq}
                tourFileUrl={tour.tourFileUrl}
                galleryUrls={tour.galleryUrls}
                heroImageUrl={tour.heroImageUrl || tour.imageUrl}
                tourName={tour.name}
              />

              {/* Ozet */}
              {tour.description && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <h2 className="font-heading font-bold text-primary text-xl mb-4">
                    Tur Hakkinda
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tour.description}
                  </p>
                </div>
              )}

              {/* Rota */}
              {tour.cities && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <h2 className="font-heading font-bold text-primary text-xl mb-4">
                    Rota
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tour.cities.split("·").map((city, i) => (
                      <span
                        key={i}
                        className="bg-primary/5 text-primary text-sm px-4 py-2 rounded-full font-medium"
                      >
                        {city.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dahil / Haric */}
              {(tour.included?.length || tour.excluded?.length) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tour.included && tour.included.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-heading font-bold text-primary text-lg mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Fiyata Dahil
                      </h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.excluded && tour.excluded.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-heading font-bold text-primary text-lg mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Fiyata Dahil Degil
                      </h3>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sag - Sidebar */}
            <div className="space-y-6">
              {/* Fiyat karti */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-xs mb-1">Kisi basi fiyat</p>
                  {tour.oldPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      {tour.oldPrice.toLocaleString("tr-TR")} EUR
                    </p>
                  )}
                  <p className="font-heading font-bold text-3xl text-gold">
                    {tour.price?.toLocaleString("tr-TR")} EUR
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{tour.days} Gun</p>
                </div>

                {/* Price Table */}
                <div className="space-y-0 mb-6 text-sm">
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-gray-500">Cift Kisilik</span>
                    <span className="font-medium text-primary">
                      {tour.price?.toLocaleString("tr-TR")} EUR
                    </span>
                  </div>
                  {tour.singlePrice != null && (
                    <div className="flex justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-500">Tek Kisi Farki</span>
                      <span className="font-medium text-primary">
                        +{tour.singlePrice.toLocaleString("tr-TR")} EUR
                      </span>
                    </div>
                  )}
                  {tour.childPrice != null && (
                    <div className="flex justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-500">Cocuk (2-12 Yas)</span>
                      <span className="font-medium text-primary">
                        {tour.childPrice.toLocaleString("tr-TR")} EUR
                      </span>
                    </div>
                  )}
                  {tour.infantPrice != null && (
                    <div className="flex justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-500">Bebek (0-2 Yas)</span>
                      <span className="font-medium text-primary">
                        {tour.infantPrice.toLocaleString("tr-TR")} EUR
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-gray-500">Tarih</span>
                    <span className="font-medium text-primary">{tour.date}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-gray-500">Sure</span>
                    <span className="font-medium text-primary">{tour.days} Gun</span>
                  </div>
                  {tour.destination && (
                    <div className="flex justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-500">Destinasyon</span>
                      <span className="font-medium text-primary">
                        {tour.destination.flag} {tour.destination.name}
                      </span>
                    </div>
                  )}
                  {tour.groupSize && (
                    <div className="flex justify-between py-2.5 border-b border-gray-100">
                      <span className="text-gray-500">Grup</span>
                      <span className="font-medium text-primary">
                        Maksimum {tour.groupSize} kisi
                      </span>
                    </div>
                  )}
                </div>

                <a
                  href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 rounded-lg text-center text-sm transition-colors mb-3"
                >
                  Rezervasyon Yap
                </a>

                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`"${tour.name}" hakkinda soru sormak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white hover:bg-gray-50 text-primary font-semibold py-3 rounded-lg text-center text-sm transition-colors border border-gray-200"
                >
                  Soru Sor
                </a>
              </div>
            </div>
          </div>

          {/* Ilgili turlar */}
          {relatedTours.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading font-bold text-primary text-2xl mb-6">
                Benzer Turlar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTours.map((t) => (
                  <Link
                    key={t._id}
                    href={`/turlar/${t.slug.current}`}
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
                        {t.days} Gun
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
                          {t.price?.toLocaleString("tr-TR")} EUR
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
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
