import { translateArray, translateObject, translateTexts } from "./translate";
import type { Tour, Destination, Testimonial, FAQ, BlogPost, SiteSettings } from "@/sanity/lib/types";

export async function translateTours(tours: Tour[], locale: string): Promise<Tour[]> {
  if (locale === "tr" || !tours.length) return tours;

  // Collect all translatable strings
  const allTexts: string[] = [];
  for (const t of tours) {
    allTexts.push(t.name, t.cities, t.date, t.description || "");
  }
  const translated = await translateTexts(allTexts, locale);

  return tours.map((t, i) => ({
    ...t,
    name: translated[i * 4] || t.name,
    cities: translated[i * 4 + 1] || t.cities,
    date: translated[i * 4 + 2] || t.date,
    description: translated[i * 4 + 3] || t.description,
  }));
}

export async function translateTourDetail(tour: Tour, locale: string): Promise<Tour> {
  if (locale === "tr") return tour;

  const texts: string[] = [
    tour.name,
    tour.cities,
    tour.date,
    tour.description || "",
  ];

  // program
  const programTexts: string[] = [];
  if (tour.program) {
    for (const p of tour.program) {
      programTexts.push(p.title, p.details);
    }
  }

  // included, excluded, importantNotes
  const included = tour.included || [];
  const excluded = tour.excluded || [];
  const notes = tour.importantNotes || [];

  // tourFaq
  const faqTexts: string[] = [];
  if (tour.tourFaq) {
    for (const f of tour.tourFaq) {
      faqTexts.push(f.question, f.answer);
    }
  }

  // destination name
  const destName = tour.destination?.name || "";

  const allTexts = [
    ...texts,
    ...programTexts,
    ...included,
    ...excluded,
    ...notes,
    ...faqTexts,
    destName,
  ];

  const translated = await translateTexts(allTexts, locale);

  let idx = 0;
  const result: Tour = {
    ...tour,
    name: translated[idx++] || tour.name,
    cities: translated[idx++] || tour.cities,
    date: translated[idx++] || tour.date,
    description: translated[idx++] || tour.description,
  };

  if (tour.program) {
    result.program = tour.program.map((p) => ({
      ...p,
      title: translated[idx++] || p.title,
      details: translated[idx++] || p.details,
    }));
  }

  if (included.length) {
    result.included = included.map(() => translated[idx++]);
  }
  if (excluded.length) {
    result.excluded = excluded.map(() => translated[idx++]);
  }
  if (notes.length) {
    result.importantNotes = notes.map(() => translated[idx++]);
  }

  if (tour.tourFaq) {
    result.tourFaq = tour.tourFaq.map(() => ({
      question: translated[idx++],
      answer: translated[idx++],
    }));
  }

  if (tour.destination) {
    result.destination = {
      ...tour.destination,
      name: translated[idx] || tour.destination.name,
    };
  }

  return result;
}

export async function translateDestinations(
  destinations: Destination[],
  locale: string
): Promise<Destination[]> {
  if (locale === "tr") return destinations;
  return translateArray(destinations, ["name"], locale);
}

export async function translateTestimonials(
  testimonials: Testimonial[],
  locale: string
): Promise<Testimonial[]> {
  if (locale === "tr") return testimonials;
  return translateArray(testimonials, ["text", "tour"], locale);
}

export async function translateFaqs(
  faqs: FAQ[],
  locale: string
): Promise<FAQ[]> {
  if (locale === "tr") return faqs;
  return translateArray(faqs, ["question", "answer"], locale);
}

export async function translateBlogPosts(
  posts: BlogPost[],
  locale: string
): Promise<BlogPost[]> {
  if (locale === "tr") return posts;
  return translateArray(posts, ["title", "excerpt"], locale);
}

export async function translateSettings(
  settings: SiteSettings | null,
  locale: string
): Promise<SiteSettings | null> {
  if (!settings || locale === "tr") return settings;
  return translateObject(
    settings,
    ["heroTagline", "heroTitle", "heroSubtitle", "address"],
    locale
  );
}
