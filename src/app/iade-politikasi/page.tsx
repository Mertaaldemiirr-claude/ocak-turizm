import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function IadePolitikasiPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            Iade ve Iptal Politikasi
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Tur iptali ve iade kosullari hakkinda bilgilendirme
          </p>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-8">
              {/* Iptal Kosullari */}
              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-4">
                  Iptal ve Iade Kosullari
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Ocak Turizm tur programlarindan iptal ve iade talepleri asagidaki kosullara
                  tabidir. Iptal bildirimi yazili olarak (e-posta veya iletisim formu araciligiyla)
                  yapilmalidir.
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
                          30 Gun ve Uzerinde Onceden Iptal
                        </h3>
                        <p className="text-green-700 text-sm">
                          Tur baslangic tarihinden 30 gun ve daha once yapilan iptallerde, odenen
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
                          15 - 30 Gun Onceden Iptal
                        </h3>
                        <p className="text-yellow-700 text-sm">
                          Tur baslangic tarihinden 15 ila 30 gun once yapilan iptallerde, toplam
                          tur bedelinin <strong>%25&apos;i kesinti olarak uygulanir</strong>.
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
                          7 - 15 Gun Onceden Iptal
                        </h3>
                        <p className="text-orange-700 text-sm">
                          Tur baslangic tarihinden 7 ila 15 gun once yapilan iptallerde, toplam
                          tur bedelinin <strong>%50&apos;si kesinti olarak uygulanir</strong>.
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
                          0 - 7 Gun Onceden Iptal
                        </h3>
                        <p className="text-red-700 text-sm">
                          Tur baslangic tarihinden 7 gunden az bir sure kala yapilan iptallerde{" "}
                          <strong>iade yapilmamaktadir</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Genel Kosullar */}
              <div>
                <h2 className="text-lg font-heading font-bold text-primary mb-4">
                  Genel Kosullar
                </h2>
                <div className="space-y-3">
                  {[
                    "Iade islemleri, iptal talebinin onaylanmasindan itibaren 14 is gunu icinde yapilir.",
                    "Iade, odemenin yapildigi yontemle (kredi karti, banka havalesi vb.) gerceklestirilir.",
                    "Mucbir sebepler (dogal afet, salgin, savas vb.) nedeniyle Ocak Turizm tarafindan iptal edilen turlarda tam iade yapilir veya alternatif tur secenegi sunulur.",
                    "Tur programinda yapilacak degisiklikler (otel, ucus saati vb.) iptal hakki dogurabilir. Bu durumlarda kesinti uygulanmaz.",
                    "Grup turlarinda minimum katilimci sayisina ulasilamamasi durumunda, Ocak Turizm turu iptal etme hakkini sakli tutar ve tam iade yapilir.",
                    "Vize reddine bagli iptallerde, vize ucreti haric kalan tutar iade edilir. Vize reddi belgesi ibraz edilmesi gerekmektedir.",
                    "Saglik raporu ile belgelenen hastalik durumlarinda, doktor raporu ibraz edilmesi kaydIyla kesintisiz iade yapilir.",
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

              {/* Iletisim */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-heading font-semibold text-primary text-sm mb-2">
                  Iptal ve Iade Talepleri
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Iptal ve iade talepleriniz icin{" "}
                  <a href="/iletisim" className="text-gold hover:underline font-medium">
                    iletisim sayfamiz
                  </a>{" "}
                  uzerinden veya WhatsApp hattimiz araciligiyla bize ulasabilirsiniz.
                  Talebiniz en gec 24 saat icinde degerlendirilecektir.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400">
                  Son guncelleme: Temmuz 2026. Bu iade politikasi, Ocak Turizm tarafindan
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
