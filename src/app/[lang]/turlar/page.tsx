import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { allToursQuery, destinationsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings, Tour, Destination } from "@/sanity/lib/types";
import TourFilters from "@/components/TourFilters";
import { getDictionary, type Locale } from "../dictionaries";
import { translateTours, translateDestinations } from "@/lib/translateContent";

export const revalidate = 60;

export default async function TurlarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const [toursRaw, destinationsRaw, settings] = await Promise.all([
    client.fetch<Tour[]>(allToursQuery),
    client.fetch<Destination[]>(destinationsQuery),
    client.fetch<SiteSettings>(siteSettingsQuery),
  ]);

  const [tours, destinations] = await Promise.all([
    translateTours(toursRaw, lang),
    translateDestinations(destinationsRaw, lang),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50">
        {/* Hero banner */}
        <div className="bg-primary text-white py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            {dict.toursPage.title}
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            {dict.toursPage.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <TourFilters tours={tours as any} destinations={destinations as any} />
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
