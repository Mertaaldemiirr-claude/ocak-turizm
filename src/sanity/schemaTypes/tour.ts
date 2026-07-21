import { defineField, defineType } from 'sanity'

export const tour = defineType({
  name: 'tour',
  title: 'Turlar',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tur Adi',
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
      name: 'destination',
      title: 'Destinasyon',
      type: 'reference',
      to: [{ type: 'destination' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Kart Gorseli',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Gorseli (Genis)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Fotograf Galerisi',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Tur detay sayfasindaki fotograf galerisi',
    }),
    defineField({
      name: 'days',
      title: 'Gun Sayisi',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Cift Kisilik Fiyat (EUR)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Eski Fiyat (Kampanya)',
      type: 'number',
      description: 'Indirimli fiyat gostermek icin eski fiyati girin',
    }),
    defineField({
      name: 'singlePrice',
      title: 'Tek Kisilik Oda Farki (EUR)',
      type: 'number',
    }),
    defineField({
      name: 'childPrice',
      title: 'Cocuk Fiyat (2-12 yas, EUR)',
      type: 'number',
    }),
    defineField({
      name: 'infantPrice',
      title: 'Bebek Fiyat (0-2 yas, EUR)',
      type: 'number',
    }),
    defineField({
      name: 'currency',
      title: 'Para Birimi',
      type: 'string',
      options: {
        list: [
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'USD ($)', value: 'USD' },
          { title: 'TRY (₺)', value: 'TRY' },
        ],
      },
      initialValue: 'EUR',
    }),
    defineField({
      name: 'groupSize',
      title: 'Maksimum Grup Büyüklüğü',
      type: 'number',
      description: 'Örnek: 8',
    }),
    defineField({
      name: 'date',
      title: 'Tur Tarihi',
      type: 'string',
      description: 'Ornek: 15-21 Agustos 2026',
    }),
    defineField({
      name: 'cities',
      title: 'Sehirler',
      type: 'string',
      description: 'Ornek: Kahire · Luksor · Nil · Hz. Huseyin Camii',
    }),
    defineField({
      name: 'description',
      title: 'Kisa Aciklama',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'program',
      title: 'Gun Gun Program',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'day', title: 'Gun', type: 'number' }),
            defineField({ name: 'title', title: 'Baslik', type: 'string' }),
            defineField({ name: 'details', title: 'Detay', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'included',
      title: 'Fiyata Dahil',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'excluded',
      title: 'Fiyata Dahil Degil',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'importantNotes',
      title: 'Onemli Notlar',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tur ile ilgili onemli bilgiler (vize, pasaport, saglik vb.)',
    }),
    defineField({
      name: 'tourFaq',
      title: 'Tura Ozel SSS',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Soru', type: 'string' }),
            defineField({ name: 'answer', title: 'Cevap', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'tourFile',
      title: 'Tur Dosyasi (PDF)',
      type: 'file',
      description: 'Indirilebilir tur programi PDF dosyasi',
    }),
    defineField({
      name: 'featured',
      title: 'One Cikan Tur',
      type: 'boolean',
      initialValue: false,
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
      subtitle: 'date',
      media: 'image',
    },
  },
})
