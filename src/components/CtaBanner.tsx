"use client";

import { useTranslation } from "./LocaleProvider";

export default function CtaBanner() {
  const { dict } = useTranslation();
  const t = dict.ctaBanner;

  return (
    <section className="py-14 lg:py-16 bg-primary text-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-heading font-bold mb-3">{t.title}</h2>
        <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">{t.subtitle}</p>
        <a href="#rezervasyon" className="inline-block bg-gold hover:bg-gold-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm">
          {t.cta}
        </a>
      </div>
    </section>
  );
}
