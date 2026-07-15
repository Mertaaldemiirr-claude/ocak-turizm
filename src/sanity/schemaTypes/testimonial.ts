import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Muster Yorumlari',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Musteri Adi',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tour',
      title: 'Tur Adi',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Yorum',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Puan (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
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
      subtitle: 'tour',
    },
  },
})
