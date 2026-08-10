import { type SchemaTypeDefinition } from 'sanity'
import { tour } from './tour'
import { destination } from './destination'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { blogPost } from './blogPost'
import { page } from './page'
import { siteSettings } from './siteSettings'
import { galleryImage } from './galleryImage'
import { reservation } from './reservation'
import { tourRequest } from './tourRequest'
import { contactMessage } from './contactMessage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tour, destination, testimonial, faq, blogPost, page, siteSettings, galleryImage, reservation, tourRequest, contactMessage],
}
