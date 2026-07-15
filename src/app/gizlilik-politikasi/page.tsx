import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function GizlilikPolitikasiPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            Gizlilik Politikasi
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Kisisel verilerinizin korunmasi hakkinda bilgilendirme
          </p>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8">
              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  1. Kisisel Verilerin Korunmasi
                </h2>
                <p className="text-sm leading-relaxed">
                  Ocak Turizm olarak, 6698 sayili Kisisel Verilerin Korunmasi Kanunu (KVKK)
                  kapsaminda kisisel verilerinizin guvenligine buyuk onem veriyoruz. Web sitemizi
                  ziyaret ettiginizde ve hizmetlerimizden yararlandiginizda toplanan kisisel
                  verileriniz, ilgili mevzuat hukumleri cercevesinde islenmekte ve korunmaktadir.
                </p>
                <p className="text-sm leading-relaxed mt-3">
                  Toplanan kisisel veriler arasinda ad, soyad, telefon numarasi, e-posta adresi,
                  pasaport bilgileri ve odeme bilgileri yer alabilir. Bu veriler yalnizca tur
                  organizasyonu, rezervasyon islemleri ve musterilerimizle iletisim amaciyla
                  kullanilmaktadir.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  2. Cerez (Cookie) Politikasi
                </h2>
                <p className="text-sm leading-relaxed">
                  Web sitemiz, kullanici deneyimini iyilestirmek amaciyla cerezler kullanmaktadir.
                  Cerezler, tarayicinizda saklanan kucuk metin dosyalaridir ve siteyi bir sonraki
                  ziyaretinizde sizi tanima, tercihlerinizi hatirlama gibi amaclarla kullanilir.
                </p>
                <p className="text-sm leading-relaxed mt-3">
                  Zorunlu cerezler: Web sitesinin duzgun calismasini saglar.
                  Analitik cerezler: Ziyaretci istatistiklerini toplar, kimliginizi belirlemez.
                  Tercih cerezleri: Dil ve bolge tercihlerinizi hatirlar.
                  Tarayici ayarlarinizdan cerezleri devre disi birakabilir veya silebilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  3. Veri Paylasimi
                </h2>
                <p className="text-sm leading-relaxed">
                  Kisisel verileriniz, acik rizaniz olmaksizin ucuncu taraflarla paylasilmaz.
                  Ancak asagidaki durumlarda veri paylasimi yapilabilir:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed mt-3 space-y-1">
                  <li>Yasal zorunluluklar geregi resmi kurumlara bilgi verilmesi</li>
                  <li>Tur organizasyonu icin otel, havaolu ve transfer sirketleri ile paylasim</li>
                  <li>Odeme islemleri icin banka ve odeme kuruluslari ile paylasim</li>
                  <li>Sigorta islemleri icin sigorta sirketleri ile paylasim</li>
                </ul>
                <p className="text-sm leading-relaxed mt-3">
                  Paylasilan veriler yalnizca ilgili hizmetin ifasi icin gerekli olan minimum
                  duzeydir ve ucuncu taraflar da KVKK kapsaminda veri guvenligini saglamakla
                  yukumludur.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  4. Haklariniz
                </h2>
                <p className="text-sm leading-relaxed">
                  KVKK kapsaminda asagidaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed mt-3 space-y-1">
                  <li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
                  <li>Kisisel verileriniz islenmisse buna iliskin bilgi talep etme</li>
                  <li>Kisisel verilerinizin islenme amacini ve bunlarin amacina uygun kullanilip kullanilmadigini ogrenme</li>
                  <li>Yurt icinde veya yurt disinda kisisel verilerinizin aktarildigi ucuncu kisileri bilme</li>
                  <li>Kisisel verilerinizin eksik veya yanlis islenmis olmasi halinde bunlarin duzeltilmesini isteme</li>
                  <li>Kisisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                  <li>Islenen verilerin munhasiran otomatik sistemler vasitasiyla analiz edilmesi suretiyle aleyhine bir sonucun ortaya cikmasina itiraz etme</li>
                </ul>
                <p className="text-sm leading-relaxed mt-3">
                  Bu haklarinizi kullanmak icin{" "}
                  <a href="/iletisim" className="text-gold hover:underline">
                    iletisim sayfamiz
                  </a>{" "}
                  uzerinden bizimle iletisime gecebilirsiniz.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400">
                  Son guncelleme: Temmuz 2026. Bu gizlilik politikasi, Ocak Turizm tarafindan
                  herhangi bir zamanda guncellenebilir. Guncellemeler web sitemizde yayinlandigi
                  anda yururluge girer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
