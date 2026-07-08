"use client";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";

const destinations = [
  {
    name: "Misir",
    image: "/images/misir-card-new.jpg",
    description: "Firavunlarin topraklarinda binlerce yillik tarihe dokunun. Piramitlerde gundogumlari, Nil'de gunbatimlari.",
    tours: 5,
    startPrice: "899",
    currency: "EUR",
    duration: "7-10 Gun",
    highlights: ["Kahire", "Luksor", "Nil Kruvaziyer", "Hurghada"],
    bestSeason: "Ekim - Nisan",
  },
  {
    name: "Fas",
    image: "/images/fas-card-new.jpg",
    description: "Renklerin, kokularin ve tatlarin ulkesinde kaybolun. Medina sokaklarindan Sahara'nin sessizligine.",
    tours: 4,
    startPrice: "749",
    currency: "EUR",
    duration: "5-8 Gun",
    highlights: ["Marakes", "Fes", "Sefsan", "Sahara"],
    bestSeason: "Mart - Mayis",
  },
  {
    name: "Ozbekistan",
    image: "/images/ozbekistan-card-new.jpg",
    description: "Ipek Yolu'nun kalbinde, turkuaz kubbelerin ve altin mozaiklerin buyuleyici dunyasi.",
    tours: 3,
    startPrice: "699",
    currency: "EUR",
    duration: "6-9 Gun",
    highlights: ["Semerkant", "Buhara", "Hive", "Taskent"],
    bestSeason: "Nisan - Haziran",
  },
  {
    name: "Bosna Hersek",
    image: "/images/bosna-card-new.jpg",
    description: "Tarihi kopruler, zumrut nehirler ve Osmanli mirasi. Balkan'in en otantik destinasyonu.",
    tours: 6,
    startPrice: "549",
    currency: "EUR",
    duration: "4-7 Gun",
    highlights: ["Saraybosna", "Mostar", "Travnik", "Pocitelj"],
    bestSeason: "Mayis - Ekim",
  },
];

export default function Destinations() {
  return (
    <section id="destinasyonlar" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/[0.02] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="section-divider" />
              <span className="text-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase">
                Destinasyonlar
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight"
            >
              Hayalinizdeki
              <br />
              <span className="text-gradient">Rotalar</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy-light text-lg max-w-md leading-relaxed"
          >
            Size ozel planlanmis turlarla, dunya'nin en buyuleyici
            destinasyonlarini kesfedin.
          </motion.p>
        </div>

        {/* Destination Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700 card-shine"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image */}
                <div className="relative w-full md:w-2/5 h-48 sm:h-56 md:h-auto min-h-0 md:min-h-[280px] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/20 to-transparent" />
                  {/* Price badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-navy/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                      <span className="text-xs text-white/60">Baslayan</span>
                      <div className="font-heading font-bold text-lg leading-tight">
                        <span className="text-gold">{dest.currency === "EUR" ? "\u20AC" : "$"}</span>
                        {dest.startPrice}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading font-bold text-2xl text-navy">
                        {dest.name}
                      </h3>
                      <span className="text-xs bg-gold/10 text-gold font-semibold px-3 py-1 rounded-full">
                        {dest.tours} Tur
                      </span>
                    </div>
                    <p className="text-navy-light text-sm leading-relaxed mb-5">
                      {dest.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {dest.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-gray-light/70 text-navy-light px-3 py-1.5 rounded-lg font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-navy-light/70 mb-6">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {dest.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                        {dest.bestSeason}
                      </span>
                    </div>
                  </div>

                  <a
                    href="#rezervasyon"
                    className="inline-flex items-center gap-2 text-navy font-semibold text-sm group/link hover:text-gold transition-colors"
                  >
                    Detayli Bilgi ve Rezervasyon
                    <HiArrowRight className="group-hover/link:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
