"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/sanity/lib/types";

interface Props {
  destinations: Destination[];
}

export default function Destinations({ destinations }: Props) {
  return (
    <section id="destinasyonlar" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            Populer Destinasyonlar
          </h2>
          <p className="text-gray-500 text-sm">
            Islami tarihi ve kulturel zenginlikleriyle one cikan rotalar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {destinations.map((dest) => (
            <Link
              key={dest._id}
              href={`/turlar?destinasyon=${dest.slug.current}`}
              className="relative rounded-2xl overflow-hidden h-44 group hover:-translate-y-1 hover:shadow-lg transition-all duration-200 shadow-sm"
            >
              {dest.imageUrl ? (
                <Image
                  src={dest.imageUrl}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-primary" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <span className="text-3xl mb-2">{dest.flag}</span>
                <h3 className="font-heading font-semibold text-sm mb-0.5">
                  {dest.name}
                </h3>
                <p className="text-white/70 text-xs">{dest.tourCount} tur</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
