import { defineField, defineType } from 'sanity'

export const tourRequest = defineType({
  name: 'tourRequest',
  title: 'Özel Tur Talebi',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Ad Soyad', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-posta', type: 'string' }),
    defineField({ name: 'startDate', title: 'Başlangıç Tarihi', type: 'string' }),
    defineField({ name: 'endDate', title: 'Bitiş Tarihi', type: 'string' }),
    defineField({ name: 'people', title: 'Kişi Sayısı', type: 'string' }),
    defineField({ name: 'accommodation', title: 'Konaklama Tercihi', type: 'string' }),
    defineField({ name: 'destinations', title: 'Gitmek İstediği Yerler', type: 'text', rows: 3 }),
    defineField({ name: 'notes', title: 'Notlar', type: 'text', rows: 4 }),
    defineField({
      name: 'status',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
          { title: 'Yeni', value: 'pending' },
          { title: 'İletişime Geçildi', value: 'contacted' },
          { title: 'Kapandı', value: 'closed' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({ name: 'receivedAt', title: 'Alınma Zamanı', type: 'datetime' }),
  ],
  orderings: [
    {
      title: 'Yeniden Eskiye',
      name: 'receivedAtDesc',
      by: [{ field: 'receivedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', dest: 'destinations', date: 'receivedAt' },
    prepare({ title, dest, date }) {
      return {
        title: title || 'İsimsiz',
        subtitle: `${dest || ''} — ${date ? new Date(date as string).toLocaleString('tr-TR') : ''}`,
      }
    },
  },
})
