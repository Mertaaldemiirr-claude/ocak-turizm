import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { getDictionary, type Locale } from "../dictionaries";

export const revalidate = 60;

export default async function GizlilikPolitikasiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            {dict.privacyPage.title}
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            {dict.privacyPage.subtitle}
          </p>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8">
              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  1. Kişisel Verilerin Korunması
                </h2>
                <p className="text-sm leading-relaxed">
                  Ocak Turizm olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
                  kapsamında kişisel verilerinizin güvenliğine büyük önem veriyoruz. Web sitemizi
                  ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda toplanan kişisel
                  verileriniz, ilgili mevzuat hükümleri çerçevesinde işlenmekte ve korunmaktadır.
                </p>
                <p className="text-sm leading-relaxed mt-3">
                  Toplanan kişisel veriler arasında ad, soyad, telefon numarası, e-posta adresi,
                  pasaport bilgileri ve ödeme bilgileri yer alabilir. Bu veriler yalnızca tur
                  organizasyonu, rezervasyon işlemleri ve müşterilerimizle iletişim amacıyla
                  kullanılmaktadır.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  2. Çerez (Cookie) Politikası
                </h2>
                <p className="text-sm leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır.
                  Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır ve siteyi bir sonraki
                  ziyaretinizde sizi tanıma, tercihlerinizi hatırlama gibi amaçlarla kullanılır.
                </p>
                <p className="text-sm leading-relaxed mt-3">
                  Zorunlu çerezler: Web sitesinin düzgün çalışmasını sağlar.
                  Analitik çerezler: Ziyaretçi istatistiklerini toplar, kimliğinizi belirlemez.
                  Tercih çerezleri: Dil ve bölge tercihlerinizi hatırlar.
                  Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilir veya silebilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  3. Veri Paylaşımı
                </h2>
                <p className="text-sm leading-relaxed">
                  Kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz.
                  Ancak aşağıdaki durumlarda veri paylaşımı yapılabilir:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed mt-3 space-y-1">
                  <li>Yasal zorunluluklar gereği resmi kurumlara bilgi verilmesi</li>
                  <li>Tur organizasyonu için otel, havayolu ve transfer şirketleri ile paylaşım</li>
                  <li>Ödeme işlemleri için banka ve ödeme kuruluşları ile paylaşım</li>
                  <li>Sigorta işlemleri için sigorta şirketleri ile paylaşım</li>
                </ul>
                <p className="text-sm leading-relaxed mt-3">
                  Paylaşılan veriler yalnızca ilgili hizmetin ifası için gerekli olan minimum
                  düzeydir ve üçüncü taraflar da KVKK kapsamında veri güvenliğini sağlamakla
                  yükümlüdür.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-3">
                  4. Haklarınız
                </h2>
                <p className="text-sm leading-relaxed">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside text-sm leading-relaxed mt-3 space-y-1">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                  <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                  <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                </ul>
                <p className="text-sm leading-relaxed mt-3">
                  Bu haklarınızı kullanmak için{" "}
                  <a href={`/${lang}/iletisim`} className="text-gold hover:underline">
                    iletişim sayfamız
                  </a>{" "}
                  üzerinden bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400">
                  Son güncelleme: Temmuz 2026. Bu gizlilik politikası, Ocak Turizm tarafından
                  herhangi bir zamanda güncellenebilir. Güncellemeler web sitemizde yayınlandığı
                  anda yürürlüğe girer.
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
