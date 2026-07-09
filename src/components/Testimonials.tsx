"use client";

import { useState } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    name: "Ayse K.",
    tour: "Misir Turu",
    text: "Helal yemek konusunda hic sikinti yasanmadi. Hz. Huseyin Camii'nde namaz kilmak ayri bir heyecan. Ailemle gonul rahatligiyla gittik, elinize saglik.",
    initials: "AK",
  },
  {
    name: "Mehmet Y.",
    tour: "Bosna Hersek Turu",
    text: "Gazi Husrev Bey Camii'nde cuma namazi kildik, Mostar'da ezan sesi esliginde kopruden izledik. Osmanli izlerini yerinde gormek baska bir duygu.",
    initials: "MY",
  },
  {
    name: "Fatma S.",
    tour: "Fas Turu",
    text: "Karaviyyin Medresesi'ni gormek listemizdeydi. Sahrada yildizlarin altinda kalmak, helal yemekler, huzurlu bir ortam. Her seyi dusunmusler.",
    initials: "FS",
  },
  {
    name: "Ali D.",
    tour: "Ozbekistan Turu",
    text: "Imam Buhari hazretlerinin turbesini ziyaret etmek cok anlamliydi. Semerkant medreseleri, Buhara'nin manevi atmosferi... Kesinlikle gidin.",
    initials: "AD",
  },
  {
    name: "Zeynep T.",
    tour: "Misir Turu",
    text: "Namaz vakitlerine gore program yapilmasi bizi cok rahatlatti. El-Ezher Camii'nde vakit namazi kilmak, Nil'de huzurlu bir yolculuk. Herkese tavsiye ederim.",
    initials: "ZT",
  },
  {
    name: "Hasan B.",
    tour: "Bosna Hersek Turu",
    text: "Uc kez gittik, her seferinde ayni hassasiyet. Alkolsuz otel, helal mutfak, namaz molalari — ailece rahat ettik. Guvenilir ve samimi bir ekip.",
    initials: "HB",
  },
];

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="yorumlar" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            Musterilerimiz Ne Diyor?
          </h2>
          <div className="flex items-center justify-center gap-2 mb-1">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="text-gold text-lg" />
            ))}
            <span className="font-heading font-bold text-primary ml-1">5.0</span>
          </div>
          <p className="text-gray-500 text-sm">
            Ailelerden gelen gercek deneyimler
          </p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading font-semibold text-primary text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.tour}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="text-gold text-sm" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary disabled:opacity-30 transition-colors"
            >
              <HiChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === page ? "bg-primary w-6" : "bg-gray-300"}`}
              />
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary disabled:opacity-30 transition-colors"
            >
              <HiChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
