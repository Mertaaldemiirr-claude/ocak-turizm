"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Tour {
  _id: string;
  name: string;
  slug: { current: string };
  imageUrl: string | null;
  days: number;
  price: number;
  date: string;
  cities: string;
  destination: { name: string; slug: { current: string }; flag: string } | null;
}

interface Destination {
  _id: string;
  name: string;
  slug: { current: string };
  tourCount: number;
}

interface Props {
  tours: Tour[];
  destinations: Destination[];
}

export default function TourFilters({ tours, destinations }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? tours
      : tours.filter((t) => t.destination?.slug?.current === activeFilter);

  return (
    <>
      {/* Filtre butonlari */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === "all"
              ? "bg-primary text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
          }`}
        >
          Tumu ({tours.length})
        </button>
        {destinations.map((dest) => (
          <button
            key={dest._id}
            onClick={() => setActiveFilter(dest.slug.current)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === dest.slug.current
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {dest.name} ({dest.tourCount})
          </button>
        ))}
      </div>

      {/* Tur kartlari */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm">Bu kategoride tur bulunamadi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tour) => (
            <Link
              key={tour._id}
              href={`/turlar/${tour.slug.current}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
            >
              <div className="relative h-52 overflow-hidden bg-gray-200">
                {tour.imageUrl ? (
                  <Image
                    src={tour.imageUrl}
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                    Gorsel yok
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tour.days} Gun
                </div>
                {tour.destination && (
                  <div className="absolute top-3 right-3 bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {tour.destination.flag} {tour.destination.name}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-primary text-base mb-2 group-hover:text-gold transition-colors">
                  {tour.name}
                </h3>
                <p className="text-gray-400 text-xs mb-3">{tour.cities}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-500 text-xs">{tour.date}</span>
                  <span className="font-heading font-bold text-gold text-lg">
                    €{tour.price?.toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
