import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { getDictionary, type Locale } from "../dictionaries";

export default async function IadePolitikasiPage({
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
            {dict.refundPage.title}
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            {dict.refundPage.subtitle}
          </p>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-8">
              {/* İptal Koşulları */}
              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-4">
                  İptal ve İade Koşulları
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Ocak Turizm tur programlarından iptal ve iade talepleri aşağıdaki koşullara
                  tabidir. İptal bildirimi yazılı olarak (e-posta veya iletişim formu aracılığıyla)
                  yapılmalıdır.
                </p>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-green-800 text-sm mb-1">
                          30 Gün ve Üzerinde Önceden İptal
                        </h3>
                        <p className="text-green-700 text-sm">
                          Tur başlangıç tarihinden 30 gün ve daha önce yapılan iptallerde, ödenen
                          tutar <strong>kesintisiz olarak iade edilir</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-yellow-800 text-sm mb-1">
                          15 - 30 Gün Önceden İptal
                        </h3>
                        <p className="text-yellow-700 text-sm">
                          Tur başlangıç tarihinden 15 ila 30 gün önce yapılan iptallerde, toplam
                          tur bedelinin <strong>%25&apos;i kesinti olarak uygulanır</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-orange-800 text-sm mb-1">
                          7 - 15 Gün Önceden İptal
                        </h3>
                        <p className="text-orange-700 text-sm">
                          Tur başlangıç tarihinden 7 ila 15 gün önce yapılan iptallerde, toplam
                          tur bedelinin <strong>%50&apos;si kesinti olarak uygulanır</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-red-800 text-sm mb-1">
                          0 - 7 Gün Önceden İptal
                        </h3>
                        <p className="text-red-700 text-sm">
                          Tur başlangıç tarihinden 7 günden az bir süre kala yapılan iptallerde{" "}
                          <strong>iade yapılmamaktadır</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Genel Koşullar */}
              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-4">
                  Genel Koşullar
                </h2>
                <div className="space-y-3">
                  {[
                    "İade işlemleri, iptal talebinin onaylanmasından itibaren 14 iş günü içinde yapılır.",
                    "İade, ödemenin yapıldığı yöntemle (kredi kartı, banka havalesi vb.) gerçekleştirilir.",
                    "Mücbir sebepler (doğal afet, salgın, savaş vb.) nedeniyle Ocak Turizm tarafından iptal edilen turlarda tam iade yapılır veya alternatif tur seçeneği sunulur.",
                    "Tur programında yapılacak değişiklikler (otel, uçuş saati vb.) iptal hakkı doğurabilir. Bu durumlarda kesinti uygulanmaz.",
                    "Grup turlarında minimum katılımcı sayısına ulaşılamaması durumunda, Ocak Turizm turu iptal etme hakkını saklı tutar ve tam iade yapılır.",
                    "Vize reddine bağlı iptallerde, vize ücreti hariç kalan tutar iade edilir. Vize reddi belgesi ibraz edilmesi gerekmektedir.",
                    "Sağlık raporu ile belgelenen hastalık durumlarında, doktor raporu ibraz edilmesi kaydıyla kesintisiz iade yapılır.",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* İletişim */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-heading font-semibold text-primary text-sm mb-2">
                  İptal ve İade Talepleri
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  İptal ve iade talepleriniz için{" "}
                  <a href={`/${lang}/iletisim`} className="text-gold hover:underline font-medium">
                    iletişim sayfamız
                  </a>{" "}
                  üzerinden veya WhatsApp hattımız aracılığıyla bize ulaşabilirsiniz.
                  Talebiniz en geç 24 saat içinde değerlendirilecektir.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400">
                  Son güncelleme: Temmuz 2026. Bu iade politikası, Ocak Turizm tarafından
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
