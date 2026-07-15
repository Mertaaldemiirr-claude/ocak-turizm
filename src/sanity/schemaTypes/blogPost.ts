import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Yazilari',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Baslik',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Gorseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Kisa Ozet',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Icerik',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Metin',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Seyahat Rehberi', value: 'rehber' },
          { title: 'Kultur', value: 'kultur' },
          { title: 'Yemek', value: 'yemek' },
          { title: 'Tavsiyeler', value: 'tavsiye' },
          { title: 'Duyurular', value: 'duyuru' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayin Tarihi',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
