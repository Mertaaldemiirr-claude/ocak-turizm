import type { SiteSettings, FAQ, Tour } from "@/sanity/lib/types";

interface TravelAgencyProps {
  settings: SiteSettings | null;
}

export function TravelAgencyJsonLd({ settings }: TravelAgencyProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Ocak Turizm",
    description:
      "Islami degerlere uygun, helal konaklama ve namaz duzenli tur organizasyonlari.",
    url: "https://ocak-turizm.vercel.app",
    telephone: settings?.phone || "+90 555 123 4567",
    email: settings?.email || "info@ocakturizm.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: settings?.address || "Istanbul, Turkiye",
      addressCountry: "TR",
    },
    sameAs: [
      settings?.instagram || "",
      settings?.facebook || "",
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FAQPageProps {
  faqs: { question: string; answer: string }[];
}

export function FAQPageJsonLd({ faqs }: FAQPageProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface TourJsonLdProps {
  tour: Tour;
}

export function TourJsonLd({ tour }: TourJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description || "",
    touristType: "Families",
    itinerary: tour.program?.map((p) => ({
      "@type": "ItemList",
      name: `Gun ${p.day}: ${p.title}`,
      description: p.details,
    })),
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
    },
    image: tour.imageUrl || undefined,
    provider: {
      "@type": "TravelAgency",
      name: "Ocak Turizm",
      url: "https://ocak-turizm.vercel.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
