import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Sikca Sorulan Sorular',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Soru',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Cevap',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
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
      title: 'question',
    },
  },
})
