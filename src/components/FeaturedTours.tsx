"use client";

import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/sanity/lib/types";

interface Props {
  tours: Tour[];
}

export default function FeaturedTours({ tours }: Props) {
  return (
    <section id="turlar" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            One Cikan Turlar
          </h2>
          <p className="text-gray-500 text-sm">
            Islami hassasiyetlere uygun, ozenle hazirlanmis tur programlari
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <Link
              key={tour._id}
              href={`/turlar/${tour.slug.current}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {tour.imageUrl ? (
                  <Image
                    src={tour.imageUrl}
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Gorsel yok
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tour.days} Gun
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-primary text-base mb-1.5">
                  {tour.name}
                </h3>
                <p className="text-gray-400 text-xs mb-1">{tour.cities}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-gray-500 text-xs">{tour.date}</span>
                  <div className="flex items-center gap-2">
                    {tour.oldPrice && (
                      <span className="text-gray-400 text-sm line-through">
                        €{tour.oldPrice.toLocaleString("tr-TR")}
                      </span>
                    )}
                    <span className="font-heading font-bold text-gold text-lg">
                      €{tour.price?.toLocaleString("tr-TR")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/turlar" className="text-primary hover:text-gold font-semibold text-sm transition-colors">
            Tum Turlari Goruntule &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
