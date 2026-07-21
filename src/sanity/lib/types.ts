export interface Tour {
  _id: string
  name: string
  slug: { current: string }
  imageUrl: string | null
  heroImageUrl?: string | null
  galleryUrls?: string[]
  days: number
  price: number
  oldPrice?: number
  singlePrice?: number
  childPrice?: number
  infantPrice?: number
  currency?: string
  groupSize?: number
  date: string
  cities: string
  description?: string
  program?: { day: number; title: string; details: string }[]
  included?: string[]
  excluded?: string[]
  importantNotes?: string[]
  tourFaq?: { question: string; answer: string }[]
  tourFileUrl?: string
  featured?: boolean
  destination?: { _id: string; name: string; slug: { current: string }; flag: string }
}

export interface Destination {
  _id: string
  name: string
  slug: { current: string }
  flag: string
  imageUrl?: string | null
  tourCount: number
}

export interface Testimonial {
  _id: string
  name: string
  tour: string
  text: string
  rating: number
}

export interface FAQ {
  _id: string
  question: string
  answer: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  coverImageUrl: string | null
  excerpt: string
  category: string
  publishedAt: string
}

export interface SiteSettings {
  phone?: string
  email?: string
  address?: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  tursabNo?: string
  heroTagline?: string
  heroTitle?: string
  heroSubtitle?: string
}
