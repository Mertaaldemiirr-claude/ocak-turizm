import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { tourDetailQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { Tour } from "@/sanity/lib/types";
import { getDictionary, type Locale } from "../../../dictionaries";
import { translateTourDetail } from "@/lib/translateContent";
import ReservationClient from "@/components/ReservationClient";

export const revalidate = 60;

export default async function ReservationPage({
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

  const tour = await translateTourDetail(tourRaw, lang);
  const sym = tour.currency === "USD" ? "$" : tour.currency === "TRY" ? "\u20BA" : "\u20AC";

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
            <span>&rsaquo;</span>
            <Link
              href={`/${lang}/turlar/${tour.slug.current}`}
              className="hover:text-primary transition-colors truncate max-w-[200px]"
            >
              {tour.name}
            </Link>
            <span>&rsaquo;</span>
            <span className="text-primary font-medium">
              {dict.reservationPage.breadcrumbReservation}
            </span>
          </nav>
        </div>

        {/* Hero banner */}
        <div className="bg-primary text-white py-10 text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
            {dict.reservationPage.title}
          </h1>
          <p className="text-white/70 text-sm">{tour.name}</p>
        </div>

        <ReservationClient
          tour={{
            name: tour.name,
            slug: tour.slug.current,
            date: tour.date,
            days: tour.days,
            price: tour.price,
            singlePrice: tour.singlePrice,
            childPrice: tour.childPrice,
            infantPrice: tour.infantPrice,
            currency: tour.currency || "EUR",
            sym,
          }}
          lang={lang}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
