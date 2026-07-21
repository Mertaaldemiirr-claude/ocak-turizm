"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { SiteSettings } from "@/sanity/lib/types";
import { useTranslation, useLocalePath } from "./LocaleProvider";

const slides = [
  { image: "/images/misir-hero-new.jpg", video: "/images/hero-video.mp4", label: "Mısır Turu" },
  { image: "/images/fas-hero-new.jpg", label: "Fas Turu" },
  { image: "/images/ozbekistan-hero-new.jpg", label: "Özbekistan Turu" },
  { image: "/images/bosna-hero-new.jpg", label: "Bosna Hersek Turu" },
];

interface Props {
  settings: SiteSettings | null;
}

export default function Hero({ settings }: Props) {
  const { dict } = useTranslation();
  const lp = useLocalePath();
  const t = dict.hero;

  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const router = useRouter();

  const tagline = settings?.heroTagline || "Güvenle keşfedin, huzurla seyahat edin.";
  const title = settings?.heroTitle || "Ailenizle birlikte unutulmaz rotalar keşfedin";
  const subtitle = settings?.heroSubtitle || "Özenle planlanmış turlar ile kültür, tarih ve doğayı bir arada yaşayın.";

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    if (videoRef.current && slides[current].video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section
      id="anasayfa"
      className="relative mt-[104px] h-[80vh] min-h-[480px] max-h-[700px] overflow-hidden bg-gray-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
          {slide.video && i === current ? (
            <video ref={videoRef} src={slide.video} muted playsInline loop autoPlay preload="none" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <Image src={slide.image} alt={slide.label} fill className="object-cover" priority={i === 0} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px" quality={75} />
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/55" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <p className="text-gold font-medium italic mb-3" style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)", textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>
          &ldquo;{tagline}&rdquo;
        </p>
        <h1 className="text-white font-heading font-bold leading-tight mb-4" style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          {title}
        </h1>
        <p className="text-white/90 mb-8 max-w-xl" style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)", textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>
          {subtitle}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchTerm.trim()) {
              router.push(`${lp("/turlar")}?q=${encodeURIComponent(searchTerm.trim())}`);
            }
          }}
          className="w-full max-w-xl"
        >
          <div className="flex bg-white/95 hover:bg-white rounded-xl shadow-lg transition-colors overflow-hidden">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 px-6 py-4 sm:py-5 text-base outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-gold text-white px-6 sm:px-7 py-4 sm:py-5 transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <button onClick={prev} className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full items-center justify-center transition-colors" aria-label={t.prev}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={next} className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full items-center justify-center transition-colors" aria-label={t.next}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"}`} />
        ))}
      </div>
    </section>
  );
}
