"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  tourName: string;
}

export default function TourGallery({ images, tourName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div className="flex gap-2 h-[320px] sm:h-[400px] lg:h-[460px]">
      {/* Main Image */}
      <div
        className="relative flex-1 rounded-xl overflow-hidden bg-gray-200"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[activeIndex]}
          alt={`${tourName} - ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full hidden sm:flex items-center justify-center shadow-md transition-colors"
              aria-label="Önceki"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full hidden sm:flex items-center justify-center shadow-md transition-colors"
              aria-label="Sonraki"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Vertical Thumbnails */}
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          className="hidden sm:flex flex-col gap-2 w-20 lg:w-24 overflow-y-auto scrollbar-hide"
        >
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                i === activeIndex
                  ? "border-gold opacity-100 ring-1 ring-gold"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={url}
                alt={`${tourName} - ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
