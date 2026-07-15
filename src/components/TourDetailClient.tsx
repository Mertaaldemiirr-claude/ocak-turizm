"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  program: { day: number; title: string; details: string }[];
  importantNotes?: string[];
  tourFaq?: { question: string; answer: string }[];
  tourFileUrl?: string;
  galleryUrls?: string[];
  heroImageUrl?: string | null;
  tourName: string;
}

type Tab = "program" | "notes" | "file" | "faq";

export default function TourDetailClient({
  program,
  importantNotes,
  tourFaq,
  tourFileUrl,
  galleryUrls,
  heroImageUrl,
  tourName,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("program");
  const [openDay, setOpenDay] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number>(-1);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Build images array from gallery or fallback to hero
  const images: string[] =
    galleryUrls && galleryUrls.length > 0
      ? galleryUrls
      : heroImageUrl
        ? [heroImageUrl]
        : [];

  const tabs: { key: Tab; label: string }[] = [
    { key: "program", label: "Program" },
    { key: "notes", label: "Onemli Notlar" },
    { key: "file", label: "Tur Dosyasi" },
    { key: "faq", label: "Sikca Sorulan Sorular" },
  ];

  const handlePrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setGalleryIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Photo Gallery Carousel */}
      {images.length > 0 && (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {/* Main Image */}
          <div className="relative h-72 sm:h-96 lg:h-[480px] bg-gray-800">
            <Image
              src={images[galleryIndex]}
              alt={`${tourName} - ${galleryIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />

            {/* Photo Counter */}
            <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {galleryIndex + 1} / {images.length}
            </div>

            {/* Left Arrow */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                  aria-label="Onceki fotograf"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                  aria-label="Sonraki fotograf"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto">
              {images.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    i === galleryIndex
                      ? "border-[#C9A84C] opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${tourName} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.key
                  ? "text-[#C9A84C]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C9A84C] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {/* Program Tab */}
          {activeTab === "program" && (
            <div className="space-y-3">
              {program.length > 0 ? (
                program.map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenDay(openDay === i ? -1 : i)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                        {item.day}
                      </div>
                      <span className="font-heading font-semibold text-primary text-sm flex-1">
                        {item.title}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          openDay === i ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDay === i && (
                      <div className="px-4 pb-4 pl-18">
                        <p className="text-gray-600 text-sm leading-relaxed ml-14">
                          {item.details}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Henuz eklenmedi.</p>
              )}
            </div>
          )}

          {/* Onemli Notlar Tab */}
          {activeTab === "notes" && (
            <div>
              {importantNotes && importantNotes.length > 0 ? (
                <ol className="space-y-3">
                  {importantNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{note}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-400 text-sm">Henuz eklenmedi.</p>
              )}
            </div>
          )}

          {/* Tur Dosyasi Tab */}
          {activeTab === "file" && (
            <div>
              {tourFileUrl ? (
                <a
                  href={tourFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Tur Dosyasini Indir (PDF)
                </a>
              ) : (
                <p className="text-gray-400 text-sm">Henuz eklenmedi.</p>
              )}
            </div>
          )}

          {/* SSS Tab */}
          {activeTab === "faq" && (
            <div className="space-y-3">
              {tourFaq && tourFaq.length > 0 ? (
                tourFaq.map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-[#C9A84C] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-heading font-semibold text-primary text-sm flex-1">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 pl-14">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Henuz eklenmedi.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
