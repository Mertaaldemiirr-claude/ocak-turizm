import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function PaymentFailed() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-primary mb-3">
            Odeme Basarisiz
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Odemeniz alinamadi. Lutfen tekrar deneyin veya
            WhatsApp uzerinden bizimle iletisime gecin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#turlar"
              className="inline-block bg-primary hover:bg-gold text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
            >
              Tekrar Dene
            </Link>
            <a
              href={`https://wa.me/${settings?.whatsapp || "905551234567"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
            >
              WhatsApp ile Ulasin
            </a>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
