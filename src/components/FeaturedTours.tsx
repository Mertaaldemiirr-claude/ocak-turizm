"use client";

import Image from "next/image";

const tours = [
  {
    image: "/images/misir-card-new.jpg",
    days: "7 Gun",
    name: "Buyuk Misir Turu",
    date: "15-21 Agustos 2026",
    price: "€899",
    dest: "Kahire · Luksor · Nil · Hz. Huseyin Camii",
  },
  {
    image: "/images/fas-card-new.jpg",
    days: "5 Gun",
    name: "Fas Kesfet Turu",
    date: "20-24 Eylul 2026",
    price: "€749",
    dest: "Marakes · Fes · Sahara · Karaviyyin Medresesi",
  },
  {
    image: "/images/ozbekistan-card-new.jpg",
    days: "6 Gun",
    name: "Buyuk Ozbekistan Turu",
    date: "10-15 Ekim 2026",
    price: "€699",
    dest: "Semerkant · Buhara · Hive · Imam Buhari Turbe",
  },
  {
    image: "/images/bosna-card-new.jpg",
    days: "4 Gun",
    name: "Bosna Hersek Turu",
    date: "5-8 Kasim 2026",
    price: "€549",
    dest: "Saraybosna · Mostar · Gazi Husrev Bey Camii",
  },
  {
    image: "/images/experience-nile.jpg",
    days: "10 Gun",
    name: "Nil Kruvaziyer Ozel",
    date: "1-10 Aralik 2026",
    price: "€1,199",
    dest: "Kahire · Luksor · Asvan · El-Ezher Camii",
  },
  {
    image: "/images/experience-sahara.jpg",
    days: "8 Gun",
    name: "Sahara Col Macerasi",
    date: "12-19 Ocak 2027",
    price: "€899",
    dest: "Marakes · Sahara · Fes · Kutubiyye Camii",
  },
];

export default function FeaturedTours() {
  return (
    <section id="turlar" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            One Cikan Turlar
          </h2>
          <p className="text-gray-500 text-sm">
            Islami hassasiyetlere uygun, ozenle hazirlanmis tur programlari
          </p>
        </div>

        {/* Tour cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <a
              key={tour.name}
              href="#rezervasyon"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tour.days}
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-primary text-base mb-1.5">
                  {tour.name}
                </h3>
                <p className="text-gray-400 text-xs mb-1">{tour.dest}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-gray-500 text-xs">{tour.date}</span>
                  <span className="font-heading font-bold text-gold text-lg">{tour.price}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <a href="#rezervasyon" className="text-primary hover:text-gold font-semibold text-sm transition-colors">
            Tum Turlari Goruntule &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
