import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarlari',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Telefon Numarasi',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-posta',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Numarasi',
      type: 'string',
      description: 'Ulke kodu ile birlikte. Ornek: 905551234567',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'tursabNo',
      title: 'TURSAB Belge No',
      type: 'string',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'Hero alani ustundeki italik yazi',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Baslik',
      type: 'string',
      description: 'Hero alanindaki ana baslik',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Alt Baslik',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Ayarlari' }
    },
  },
})
