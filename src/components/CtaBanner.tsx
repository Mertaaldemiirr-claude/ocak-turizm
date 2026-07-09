"use client";

export default function CtaBanner() {
  return (
    <section className="py-14 lg:py-16 bg-primary text-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-heading font-bold mb-3">
          Ailenize ozel tur hazirlayalim mi?
        </h2>
        <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
          Helal konaklama, namaz duzeni ve Islami mekanlar dahil — sizin icin ozel
          tur programi olusturuyoruz. Gonlunuz rahat olsun, gerisini bize birakin.
        </p>
        <a
          href="#rezervasyon"
          className="inline-block bg-gold hover:bg-gold-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
        >
          Tur Talebi Olustur
        </a>
      </div>
    </section>
  );
}
