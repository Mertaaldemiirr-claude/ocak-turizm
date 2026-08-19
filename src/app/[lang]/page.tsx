import Navbar from "@/components/Navbar";
import type { Tour } from "@/sanity/lib/types";
import Hero from "@/components/Hero";
import FeaturedTours from "@/components/FeaturedTours";
import Destinations from "@/components/Destinations";
import CtaBanner from "@/components/CtaBanner";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import ReservationForm from "@/components/ReservationForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TravelAgencyJsonLd, FAQPageJsonLd } from "@/components/JsonLd";
import { client } from "@/sanity/lib/client";
import {
  toursQuery,
  destinationsQuery,
  testimonialsQuery,
  faqsQuery,
  siteSettingsQuery,
  blogPostsQuery,
} from "@/sanity/lib/queries";
import {
  translateTours,
  translateDestinations,
  translateTestimonials,
  translateFaqs,
  translateBlogPosts,
  translateSettings,
} from "@/lib/translateContent";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const [toursRaw, destinationsRaw, testimonialsRaw, faqsRaw, settingsRaw, blogPostsRaw] =
    await Promise.all([
      client.fetch<Tour[]>(toursQuery).then((all) => {
        // Ana sayfa: her rotanin en yakin kalkisi (gecmis turlar sorguda zaten elenir)
        const seen = new Set<string>();
        return all.filter((t) => {
          const key = (t as Tour & { tourGroup?: string }).tourGroup || t._id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        }).slice(0, 8);
      }),
      client.fetch(destinationsQuery),
      client.fetch(testimonialsQuery),
      client.fetch(faqsQuery),
      client.fetch(siteSettingsQuery),
      client.fetch(blogPostsQuery),
    ]);

  const [tours, destinations, testimonials, faqs, settings, blogPosts] =
    await Promise.all([
      translateTours(toursRaw, lang),
      translateDestinations(destinationsRaw, lang),
      translateTestimonials(testimonialsRaw, lang),
      translateFaqs(faqsRaw, lang),
      translateSettings(settingsRaw, lang),
      translateBlogPosts(blogPostsRaw, lang),
    ]);

  return (
    <>
      <TravelAgencyJsonLd settings={settings} />
      <FAQPageJsonLd faqs={faqs} />
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <FeaturedTours tours={tours} />
      <Destinations destinations={destinations} />
      <CtaBanner />
      <WhyUs />
      <Testimonials testimonials={testimonials} />
      <BlogPreview posts={blogPosts} />
      <FAQ faqs={faqs} />
      <ReservationForm settings={settings} />
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
    </>
  );
}
