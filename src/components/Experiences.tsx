"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    image: "/images/experience-nile.jpg",
    title: "Nil Kruvaziyer Turu",
    description: "Luksor'dan Asvan'a, antik tapinaklari kesfederek Nil boyunca huzurlu bir yolculuk.",
    tag: "Misir",
  },
  {
    image: "/images/experience-sahara.jpg",
    title: "Sahara Col Kampi",
    description: "Altin kum tepelerinde deve safari ve yildizlarin altinda luks cadir deneyimi.",
    tag: "Fas",
  },
  {
    image: "/images/about-group.jpg",
    title: "Kucuk Grup Turlari",
    description: "Kalabalik turist kitlelerinden uzak, samimi ve kisisel bir seyahat deneyimi.",
    tag: "Ozel",
  },
  {
    image: "/images/about-guide.jpg",
    title: "Uzman Rehberlik",
    description: "Bolgeyi ve tarihi derinden bilen, tutkulu profesyonel rehberlerle kesif.",
    tag: "Premium",
  },
];

export default function Experiences() {
  return (
    <section id="deneyimler" className="py-24 lg:py-32 bg-gray-warm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="section-divider" />
            <span className="text-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase">
              Deneyimler
            </span>
            <div className="section-divider" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-5"
          >
            Unutulmaz <span className="text-gradient">Anlar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy-light text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Sadece bir tur degil, hayat boyu hatirlanacak bir deneyim sunuyoruz
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large card - spans 2 rows on lg */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:row-span-2 group relative rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[350px] lg:min-h-0"
          >
            <Image
              src={experiences[0].image}
              alt={experiences[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <span className="inline-block bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
                {experiences[0].tag}
              </span>
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                {experiences[0].title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {experiences[0].description}
              </p>
            </div>
          </motion.div>

          {/* Other cards */}
          {experiences.slice(1).map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
              className="group relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[280px]"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
                  {exp.tag}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mb-1.5">
                  {exp.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
