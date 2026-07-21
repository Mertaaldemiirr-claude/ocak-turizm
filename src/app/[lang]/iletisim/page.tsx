import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { getDictionary, type Locale } from "../dictionaries";

export const revalidate = 60;

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const settings = await client.fetch(siteSettingsQuery);

  const phone = settings?.phone || "+90 555 123 4567";
  const email = settings?.email || "info@ocakturizm.com";
  const address = settings?.address || "İstanbul, Türkiye";
  const whatsapp = settings?.whatsapp || "905551234567";
  const tursabNo = settings?.tursabNo || "XXXXX";

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen">
        {/* Hero */}
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">
            {dict.contactPage.title}
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            {dict.contactPage.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sol - Bilgiler */}
            <div>
              <h2 className="font-heading font-bold text-primary text-2xl mb-6">
                {dict.contactPage.reachUs}
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {dict.contactPage.reachUsDesc}
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { icon: HiPhone, label: dict.contactPage.phone, value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
                  { icon: HiMail, label: dict.contactPage.email, value: email, href: `mailto:${email}` },
                  { icon: HiLocationMarker, label: dict.contactPage.address, value: address },
                  { icon: HiClock, label: dict.contactPage.workingHours, value: dict.contactPage.workingHoursValue },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-heading font-semibold text-primary text-sm hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-heading font-semibold text-primary text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 text-xs mb-6">TURSAB Belge No: {tursabNo}</p>

              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(dict.reservation.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                <FaWhatsapp className="text-xl" />
                {dict.contactPage.whatsappCta}
              </a>
            </div>

            {/* Sag - Form */}
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
