import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomTourForm from "@/components/CustomTourForm";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { getDictionary, type Locale } from "../dictionaries";

export const revalidate = 60;

export default async function OzelTurTalebiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const settings = await client.fetch(siteSettingsQuery);

  const steps = [
    { step: "1", title: dict.customTourPage.step1, desc: dict.customTourPage.step1Desc },
    { step: "2", title: dict.customTourPage.step2, desc: dict.customTourPage.step2Desc },
    { step: "3", title: dict.customTourPage.step3, desc: dict.customTourPage.step3Desc },
  ];

  const whoForItems = [
    { title: dict.customTourPage.families, desc: dict.customTourPage.familiesDesc },
    { title: dict.customTourPage.groups, desc: dict.customTourPage.groupsDesc },
    { title: dict.customTourPage.specialOccasions, desc: dict.customTourPage.specialOccasionsDesc },
    { title: dict.customTourPage.business, desc: dict.customTourPage.businessDesc },
  ];

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        {/* Hero */}
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            {dict.customTourPage.title}
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            {dict.customTourPage.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 3 Adim */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {steps.map((item) => (
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
                {dict.customTourPage.whoFor}
              </h2>
              <div className="space-y-3">
                {whoForItems.map((item) => (
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
