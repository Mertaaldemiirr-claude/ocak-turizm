import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Helal Konsept",
    description: "Tum turlarimizda helal konaklama, helal yemek ve namaz duzenine onem veriyoruz.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    ),
    title: "Guvenilirlik",
    description: "TURSAB belgeli, sigorta kapsamli organizasyonlar ile gonul rahatligiyla seyahat.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
    title: "Aile Ortami",
    description: "Butik gruplar, samimi atmosfer. Ailece rahat edebileceginiz ortamlar olusturuyoruz.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
    ),
    title: "Premium Kalite",
    description: "Kaliteli konaklama, uzman rehberlik ve ozenle hazirlanmis programlar.",
  },
];

export default async function HakkimizdaPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        {/* Hero */}
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            Hakkimizda
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Islami degerlere uygun, aile dostu tur organizasyonlari
          </p>
        </div>

        {/* Hikaye */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                Biz Kimiz?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
                Ocak Turizm olarak misyonumuz; Islami hassasiyetlere uygun, kaliteli ve
                unutulmaz seyahat deneyimleri sunmaktir. Helal konaklama, namaz duzeni ve
                aile dostu ortamlar ile gonul rahatligiyla dunyanin guzelliklerini kesfedin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="font-heading font-bold text-primary text-lg mb-3">Misyonumuz</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Musterilerimize Islami degerlere uygun, kaliteli ve guvenilir tur
                  organizasyonlari sunarak, ailece huzurlu seyahat deneyimleri yasamalarini
                  saglamak. Her turda helal konaklama, namaz duzeni ve kulturel zenginlikleri
                  bir arada sunuyoruz.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="font-heading font-bold text-primary text-lg mb-3">Vizyonumuz</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Turkiye'nin en guvenilir Islami turizm markasi olarak, dunya genelinde
                  Islami degerlere uygun seyahat secenekleri sunan, musterilerinin ilk tercihi
                  olan bir turizm sirketi olmak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Degerler */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary text-center mb-12">
              Degerlerimiz
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-primary text-sm mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neden Biz */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary text-center mb-12">
              Neden Ocak Turizm?
            </h2>
            <div className="space-y-6">
              {[
                { title: "Helal Konaklama Garantisi", text: "Tum turlarimizda alkolsuz otel secenekleri, helal mutfak ve aile dostu tesisler tercih ediyoruz. Domuz eti iceren urunler kesinlikle bulunmaz." },
                { title: "Namaz Vakitlerine Uygun Program", text: "Tur programlarimiz namaz vakitlerine gore planlanir. Her mola noktasinda yakindaki camiler belirlenir ve namaz icin yeterli sure ayrilir." },
                { title: "Butik ve Kisisellestirilmis Hizmet", text: "Kucuk gruplar ile samimi bir atmosfer sunuyoruz. Her misafirimizle bire bir ilgileniyoruz." },
                { title: "Her Sey Dahil Konfor", text: "Ucak bileti, konaklama, transferler, rehberlik ve tum geziler fiyata dahildir. Ek masraf endisesi olmadan seyahatinizin tadini cikarin." },
                { title: "Uzman Rehberlik", text: "Destinasyonlari iyi bilen, Turkce konusan profesyonel rehberler esliginde unutulmaz deneyimler yasiyin." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Istatistikler */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Mutlu Gezgin" },
                { number: "50+", label: "Duzenlenen Tur" },
                { number: "4", label: "Destinasyon" },
                { number: "5.0", label: "Ortalama Puan" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-heading font-bold text-gold mb-1">{stat.number}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
