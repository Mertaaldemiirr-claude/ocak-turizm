import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { allToursQuery, destinationsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";
import TourFilters from "@/components/TourFilters";

interface Tour {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string | null;
  days: number;
  price: number;
  date: string;
  cities: string;
  description?: string;
  destination: { name: string; slug: { current: string }; flag: string } | null;
}

interface Destination {
  _id: string;
  name: string;
  slug: { current: string };
  tourCount: number;
}

export default async function TurlarPage() {
  const [tours, destinations, settings] = await Promise.all([
    client.fetch<Tour[]>(allToursQuery),
    client.fetch<Destination[]>(destinationsQuery),
    client.fetch<SiteSettings>(siteSettingsQuery),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50">
        {/* Hero banner */}
        <div className="bg-primary text-white py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            Turlarimiz
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Islami hassasiyetlere uygun, ozenle hazirlanmis tur programlari
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <TourFilters tours={tours} destinations={destinations} />
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
