"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Essiz Rotalar",
    description: "Kalabalik turistik noktalardan uzak, yerel ve otantik deneyimler sunan ozenle secilmis rotalar.",
    stat: "18+",
    statLabel: "Farkli Rota",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    ),
    title: "Kucuk Gruplar",
    description: "Maksimum 15 kisilik gruplarla, kisisel ilgi ve samimi bir seyahat deneyimi garantisi.",
    stat: "15",
    statLabel: "Max Kisi",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
    title: "Tam Guvence",
    description: "TURSAB belgeli, sigorta kapsamli ve kapsamli seyahat planiyla tamamen guvende hissedin.",
    stat: "100%",
    statLabel: "Sigorta",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    ),
    title: "7/24 Destek",
    description: "Seyahatiniz boyunca WhatsApp ve telefon ile aninda ulasabileceginiz destek ekibimiz.",
    stat: "7/24",
    statLabel: "Yanimizda",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
              Neden Ocak Turizm?
            </span>
            <div className="section-divider" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5"
          >
            Kesfet. Deneyimle. <span className="text-gradient">Hatirla.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Her detayi dusunulmus, her ani planlanmis seyahat deneyimleri
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-7 group hover:bg-white/12 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-gold/10 group-hover:bg-gold/20 rounded-2xl flex items-center justify-center mb-5 text-gold transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-white/10">
                <span className="font-heading font-bold text-2xl text-gold">{feature.stat}</span>
                <span className="text-white/40 text-xs ml-2">{feature.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
