import { groq } from 'next-sanity'

export const toursQuery = groq`
  *[_type == "tour" && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    days,
    price,
    oldPrice,
    currency,
    date,
    cities,
    description,
    destination-> { _id, name, slug, flag }
  }
`

export const allToursQuery = groq`
  *[_type == "tour"] | order(order asc) {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    "heroImageUrl": heroImage.asset->url,
    days,
    price,
    oldPrice,
    date,
    cities,
    description,
    program,
    included,
    excluded,
    featured,
    destination-> { _id, name, slug, flag }
  }
`

export const tourDetailQuery = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    "heroImageUrl": heroImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    days,
    price,
    oldPrice,
    singlePrice,
    childPrice,
    infantPrice,
    currency,
    groupSize,
    date,
    cities,
    description,
    program,
    included,
    excluded,
    importantNotes,
    tourFaq,
    "tourFileUrl": tourFile.asset->url,
    featured,
    destination-> { _id, name, slug, flag }
  }
`

export const relatedToursQuery = groq`
  *[_type == "tour" && slug.current != $slug && destination->slug.current == $destSlug] | order(order asc) [0...3] {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    days,
    price,
    oldPrice,
    currency,
    date,
    cities
  }
`

export const searchToursQuery = groq`
  *[_type == "tour" && (name match $q || cities match $q || destination->name match $q)] | order(order asc) [0...10] {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    days,
    price,
    date,
    destination-> { name, flag }
  }
`

export const destinationsQuery = groq`
  *[_type == "destination"] | order(order asc) {
    _id,
    name,
    slug,
    flag,
    "imageUrl": image.asset->url,
    description,
    "tourCount": count(*[_type == "tour" && references(^._id)])
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    tour,
    text,
    rating
  }
`

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    phone,
    email,
    address,
    whatsapp,
    instagram,
    facebook,
    tursabNo,
    heroTagline,
    heroTitle,
    heroSubtitle
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "coverImageUrl": coverImage.asset->url,
    excerpt,
    category,
    publishedAt
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "coverImageUrl": coverImage.asset->url,
    excerpt,
    body,
    category,
    publishedAt
  }
`
