"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Image from "next/image";

const slides = [
  {
    image: "/images/misir-hero-new.jpg",
    video: "/images/hero-video.mp4",
    location: "Misir",
    title: "Firavunlarin\nIzinde",
    subtitle: "Piramitlerden Nil'e, binlerce yillik medeniyetin kalbine yolculuk",
    accent: "Kahire  ·  Luksor  ·  Nil Kruvaziyer",
  },
  {
    image: "/images/fas-hero-new.jpg",
    location: "Fas",
    title: "Renklerin\nDansi",
    subtitle: "Mavi sokaklar, egzotik baharat pazarlari ve Sahara'nin sessizligi",
    accent: "Marakes  ·  Sefsan  ·  Sahara",
  },
  {
    image: "/images/ozbekistan-hero-new.jpg",
    location: "Ozbekistan",
    title: "Ipek Yolu'nun\nHazinesi",
    subtitle: "Muhtesem medreseler, turkuaz mozaikler ve kadim sehirler",
    accent: "Semerkant  ·  Buhara  ·  Hive",
  },
  {
    image: "/images/bosna-hero-new.jpg",
    location: "Bosna Hersek",
    title: "Tarihin\nKoprusu",
    subtitle: "Osmanli mirasi, dogal cennetler ve Balkan'in en sirin sehirleri",
    accent: "Saraybosna  ·  Mostar  ·  Travnik",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slideDuration = slides[current].video ? 10000 : 6000;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const stepMs = 75;
    const increment = (stepMs / slideDuration) * 100;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + increment;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [next, slideDuration]);

  useEffect(() => {
    if (videoRef.current && slides[current].video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <section id="anasayfa" className="relative h-screen overflow-hidden bg-navy-dark">
      {/* Background - Video or Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {slides[current].video ? (
            <video
              ref={videoRef}
              src={slides[current].video}
              muted
              playsInline
              loop
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={slides[current].image}
              alt={slides[current].location}
              fill
              className="object-cover animate-slow-zoom"
              priority={current === 0}
              sizes="100vw"
            />
          )}
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/50 to-navy-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-navy-dark/40" />
          {/* Film grain effect */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Location badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm text-white/90">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  {slides[current].video && (
                    <span className="text-gold/60 text-[10px] uppercase tracking-widest mr-1">Canli</span>
                  )}
                  {slides[current].location}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-bold text-white leading-[1.05] mb-6 whitespace-pre-line"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg sm:text-xl text-white/70 mb-4 max-w-xl leading-relaxed"
              >
                {slides[current].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Accent cities */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`accent-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-gold/80 text-sm tracking-widest font-medium mb-10"
              >
                {slides[current].accent}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#destinasyonlar"
                className="group bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1 active:translate-y-0 text-center inline-flex items-center justify-center gap-2"
              >
                Turlari Kesfet
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a
                href="#rezervasyon"
                className="glass text-white font-medium px-8 py-4 rounded-xl text-base transition-all hover:bg-white/15 text-center"
              >
                Ucretsiz Danismanlik
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <div className="flex items-center justify-between">
            {/* Slide indicators with progress */}
            <div className="flex items-center gap-3">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setProgress(0); }}
                  className="group flex flex-col items-start gap-2"
                >
                  <span className={`hidden sm:block text-xs font-medium tracking-wider transition-all ${i === current ? "text-white" : "text-white/30 group-hover:text-white/50"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={`h-[2px] rounded-full transition-all duration-300 ${i === current ? "w-10 sm:w-16 bg-white/20" : "w-6 sm:w-8 bg-white/10 group-hover:bg-white/20"}`}>
                    {i === current && (
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Nav arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="glass w-12 h-12 rounded-xl flex items-center justify-center text-white hover:bg-white/15 transition-all"
                aria-label="Previous"
              >
                <HiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={next}
                className="glass w-12 h-12 rounded-xl flex items-center justify-center text-white hover:bg-white/15 transition-all"
                aria-label="Next"
              >
                <HiChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/40 to-transparent"
        />
      </div>
    </section>
  );
}
