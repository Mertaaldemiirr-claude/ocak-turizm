"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import type { FAQ as FAQType } from "@/sanity/lib/types";
import { useTranslation } from "./LocaleProvider";

interface Props {
  faqs: FAQType[];
}

export default function FAQ({ faqs }: Props) {
  const { dict } = useTranslation();
  const t = dict.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="py-16 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            {t.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq._id}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-heading font-semibold text-primary text-sm pr-4">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`text-gray-400 text-lg shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
