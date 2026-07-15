import { defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galeri Gorselleri',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Baslik',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Gorsel',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destinasyon',
      type: 'reference',
      to: [{ type: 'destination' }],
    }),
    defineField({
      name: 'order',
      title: 'Siralama',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
