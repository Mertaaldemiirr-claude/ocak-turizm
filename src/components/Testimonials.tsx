"use client";

import { useState } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { Testimonial } from "@/sanity/lib/types";
import { useTranslation } from "./LocaleProvider";

interface Props {
  testimonials: Testimonial[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Testimonials({ testimonials }: Props) {
  const { dict } = useTranslation();
  const tr = dict.testimonials;
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="yorumlar" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            {tr.title}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-1">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="text-gold text-lg" />
            ))}
            <span className="font-heading font-bold text-primary ml-1">5.0</span>
          </div>
          <p className="text-gray-500 text-sm">
            {tr.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-primary text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.tour}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <HiStar key={i} className="text-gold text-sm" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

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
