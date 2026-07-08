"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import Image from "next/image";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setCount(0);
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { number: 500, suffix: "+", label: "Mutlu Yolcu" },
  { number: 4, suffix: "", label: "Ulke" },
  { number: 18, suffix: "+", label: "Tur Rotasi" },
  { number: 98, suffix: "%", label: "Memnuniyet" },
];

const highlights = [
  "Profesyonel ve bolge uzman rehberler",
  "Tamamen ozellestirilebilir tur programlari",
  "7/24 seyahat boyunca anlik destek",
  "Uygun fiyat ve esnek odeme secenekleri",
  "Kucuk grup avantaji, kisisel deneyim",
  "TURSAB guvencelii organizasyonlar",
];

export default function About() {
  return (
    <section id="hakkimizda" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
              {/* Main large image */}
              <div className="col-span-2 md:col-span-7 relative h-[250px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-guide.jpg"
                  alt="Profesyonel rehberlik"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
              {/* Top right image */}
              <div className="col-span-1 md:col-span-5 relative h-[180px] md:h-[190px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-group.jpg"
                  alt="Mutlu yolcular"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              {/* Bottom right image */}
              <div className="col-span-1 md:col-span-5 md:col-start-8 relative h-[180px] md:h-[190px] rounded-3xl overflow-hidden shadow-xl md:-mt-[10px]">
                <Image
                  src="/images/experience-sahara.jpg"
                  alt="Col macerasi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>

            {/* Floating experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-3 lg:-left-6 bg-navy text-white rounded-2xl p-6 shadow-2xl shadow-navy/30 z-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-gold">
                    <AnimatedCounter target={500} suffix="+" />
                  </p>
                  <p className="text-sm text-white/70">Mutlu Yolcu</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase">
                Hakkimizda
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-navy leading-tight mb-6">
              Seyahati Bir <span className="text-gradient">Sanata</span> Donusturuyoruz
            </h2>
            <p className="text-navy-light text-base leading-relaxed mb-4">
              Ocak Turizm olarak, sizlere siradan bir tatilden cok daha fazlasini
              sunuyoruz. Her turumuz, ozenle arastirilmis rotalar, yerel deneyimler ve
              profesyonel rehberler esliginde planlanir.
            </p>
            <p className="text-navy-light text-base leading-relaxed mb-8">
              Amacimiz, her yolcumuza hayat boyu hatirlanacak anlar yaratmak ve
              farkli kulturleri yakindan tanimanizi saglamaktir.
            </p>

            {/* Highlights - 2 column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-2.5"
                >
                  <HiCheckCircle className="text-gold text-lg shrink-0 mt-0.5" />
                  <span className="text-navy text-sm font-medium leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-light/60 rounded-2xl p-4 text-center hover:bg-gold/10 transition-colors duration-300"
                >
                  <p className="font-heading font-bold text-2xl sm:text-3xl text-navy">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </p>
                  <p className="text-navy-light text-[11px] mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
