import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function PaymentSuccess() {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-primary mb-3">
            Odemeniz Basariyla Alindi!
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Rezervasyonunuz onaylandi. En kisa surede sizinle iletisime gececegiz.
            Onay detaylari e-posta adresinize gonderilecektir.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-gold text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            Ana Sayfaya Don
          </Link>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
