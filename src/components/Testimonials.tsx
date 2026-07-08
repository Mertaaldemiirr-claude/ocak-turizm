"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    name: "Ayse K.",
    tour: "Misir Turu",
    text: "Hayatimda yaptigim en guzel seyahatlerden biriydi. Rehberimiz cok bilgili ve ilgiliydi. Piramitleri gormek cocukluk hayalimdi, sonunda gerceklesti!",
    rating: 5,
    initials: "AK",
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Mehmet Y.",
    tour: "Bosna Hersek Turu",
    text: "Saraybosna ve Mostar'da gecirdigimiz gunler unutulmazdi. Organizasyon mukemmeldi, her sey planlanan sekilde gerceklesti. Ailece cok memnun kaldik.",
    rating: 5,
    initials: "MY",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Fatma S.",
    tour: "Fas Turu",
    text: "Marakes sokaklarinda kaybolmak, Sahara'da yildizlari izlemek... Ocak Turizm'e cok tesekkurler, her seyi dusunmuslerdi. Hayalimdeki tatildi.",
    rating: 5,
    initials: "FS",
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Ali D.",
    tour: "Ozbekistan Turu",
    text: "Semerkant'in guzelligine inanamadik. Tarihi mekanlar, lezzetli yemekler ve harika bir grup. Kesinlikle tavsiye ederim, tekrar gidecegiz!",
    rating: 5,
    initials: "AD",
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Zeynep T.",
    tour: "Misir & Fas Turu",
    text: "Iki ulkeyi tek seyahatte gormek muhteseemdi. Nil kruvaziyer deneyimi hayallerimin otesindeydi. Ocak Turizm'i herkese gonu rahatligiyla oneririm.",
    rating: 5,
    initials: "ZT",
    color: "from-violet-400 to-purple-500",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="yorumlar" className="py-24 lg:py-32 bg-gray-warm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Header */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="section-divider" />
              <span className="text-gold font-heading font-semibold text-sm tracking-[0.2em] uppercase">
                Yorumlar
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-heading font-bold text-navy leading-tight mb-6"
            >
              Yolcularimiz <span className="text-gradient">Ne Diyor?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-navy-light text-lg leading-relaxed mb-8"
            >
              500'den fazla mutlu yolcumuzun deneyimlerinden sadece birkaci.
              Gercek hikayeler, gercek mutluluklar.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="text-gold text-xl" />
                  ))}
                </div>
                <span className="font-heading font-bold text-navy text-lg">5.0</span>
              </div>
              <div className="h-8 w-px bg-navy/10" />
              <div>
                <span className="font-heading font-bold text-navy">500+</span>
                <span className="text-navy-light text-sm ml-1.5">Mutlu Yolcu</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Testimonial card */}
          <div>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-navy/5"
                >
                  {/* Quote mark */}
                  <div className="text-gold/20 text-7xl font-heading leading-none mb-4">&ldquo;</div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <HiStar key={i} className="text-gold text-lg" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-navy text-lg leading-relaxed mb-8">
                    {testimonials[current].text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-heading font-bold text-sm`}>
                      {testimonials[current].initials}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-navy">
                        {testimonials[current].name}
                      </p>
                      <p className="text-navy-light text-sm">
                        {testimonials[current].tour}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "bg-gold w-8" : "bg-navy/10 w-2 hover:bg-navy/20"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-11 h-11 rounded-xl border border-navy/10 hover:border-gold hover:text-gold flex items-center justify-center text-navy transition-all"
                    aria-label="Previous"
                  >
                    <HiChevronLeft className="text-lg" />
                  </button>
                  <button
                    onClick={next}
                    className="w-11 h-11 rounded-xl border border-navy/10 hover:border-gold hover:text-gold flex items-center justify-center text-navy transition-all"
                    aria-label="Next"
                  >
                    <HiChevronRight className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
