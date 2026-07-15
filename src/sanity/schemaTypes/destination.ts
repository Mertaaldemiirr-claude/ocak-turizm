import { defineField, defineType } from 'sanity'

export const destination = defineType({
  name: 'destination',
  title: 'Destinasyonlar',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ulke Adi',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'flag',
      title: 'Bayrak Emoji',
      type: 'string',
      description: 'Ornek: \u{1F1EA}\u{1F1EC}',
    }),
    defineField({
      name: 'image',
      title: 'Kapak Gorseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Gorseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Aciklama',
      type: 'text',
      rows: 3,
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
      title: 'name',
      subtitle: 'flag',
      media: 'image',
    },
  },
})
