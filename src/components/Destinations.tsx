"use client";

const destinations = [
  { name: "Misir", flag: "\u{1F1EA}\u{1F1EC}", tours: 5 },
  { name: "Fas", flag: "\u{1F1F2}\u{1F1E6}", tours: 4 },
  { name: "Ozbekistan", flag: "\u{1F1FA}\u{1F1FF}", tours: 3 },
  { name: "Bosna Hersek", flag: "\u{1F1E7}\u{1F1E6}", tours: 6 },
];

export default function Destinations() {
  return (
    <section id="destinasyonlar" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            Populer Destinasyonlar
          </h2>
          <p className="text-gray-500 text-sm">
            Islami tarihi ve kulturel zenginlikleriyle one cikan rotalar
          </p>
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {destinations.map((dest) => (
            <a
              key={dest.name}
              href="#rezervasyon"
              className="bg-white rounded-2xl p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200 shadow-sm border border-gray-100"
            >
              <span className="text-4xl block mb-3">{dest.flag}</span>
              <h3 className="font-heading font-semibold text-primary text-sm mb-1">
                {dest.name}
              </h3>
              <p className="text-gray-400 text-xs">{dest.tours} tur</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
