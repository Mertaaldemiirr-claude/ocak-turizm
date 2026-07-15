import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomTourForm from "@/components/CustomTourForm";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function OzelTurTalebiPage() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        {/* Hero */}
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            Ozel Tur Talebi
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Size ozel, kisiye ozel tur programi hazirlayalim
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 3 Adım */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { step: "1", title: "Talebi Gonderin", desc: "Asagidaki formu doldurarak seyahat isteklerinizi bize iletin." },
              { step: "2", title: "Size Ozel Program", desc: "Uzman ekibimiz isteklerinize gore ozel bir tur programi hazirlar." },
              { step: "3", title: "Fiyat Teklifi", desc: "En uygun fiyat teklifimizi size sunar, onayinizla rezervasyonu tamamlariz." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center mx-auto mb-3 font-heading font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-primary text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sol - Bilgi */}
            <div className="lg:col-span-1">
              <h2 className="font-heading font-bold text-primary text-xl mb-4">
                Kimler Icin?
              </h2>
              <div className="space-y-3">
                {[
                  { title: "Aileler", desc: "Cocuklarla birlikte rahat seyahat etmek isteyen aileler" },
                  { title: "Gruplar", desc: "Arkadaslar, dernekler veya cemaatler icin grup turlari" },
                  { title: "Ozel Gunler", desc: "Balayi, yildonumu veya ozel kutlamalar icin turlar" },
                  { title: "Is Seyahatleri", desc: "Kurumsal ekip gezileri ve is seyahatleri" },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-heading font-semibold text-primary text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sag - Form */}
            <div className="lg:col-span-2">
              <CustomTourForm />
            </div>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
