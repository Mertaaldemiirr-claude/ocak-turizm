import { defineField, defineType } from 'sanity'

export const reservation = defineType({
  name: 'reservation',
  title: 'Rezervasyon',
  type: 'document',
  fields: [
    defineField({ name: 'tourName', title: 'Tur', type: 'string' }),
    defineField({ name: 'tourSlug', title: 'Tur Slug', type: 'string' }),
    defineField({ name: 'tourDate', title: 'Tur Tarihi', type: 'string' }),
    defineField({ name: 'contactName', title: 'Ad Soyad', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'E-posta', type: 'string' }),
    defineField({ name: 'adultCount', title: 'Yetişkin', type: 'number' }),
    defineField({ name: 'childCount', title: 'Çocuk', type: 'number' }),
    defineField({ name: 'infantCount', title: 'Bebek', type: 'number' }),
    defineField({ name: 'totalPrice', title: 'Toplam Fiyat', type: 'number' }),
    defineField({ name: 'currency', title: 'Para Birimi', type: 'string' }),
    defineField({
      name: 'participants',
      title: 'Katılımcılar (detay)',
      type: 'text',
      rows: 12,
    }),
    defineField({
      name: 'status',
      title: 'Durum',
      type: 'string',
      options: {
        list: [
          { title: 'Yeni', value: 'pending' },
          { title: 'Arandı / İletişime Geçildi', value: 'contacted' },
          { title: 'Onaylandı', value: 'confirmed' },
          { title: 'İptal', value: 'cancelled' },
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
    select: { title: 'contactName', tourName: 'tourName', date: 'receivedAt', status: 'status' },
    prepare({ title, tourName, date, status }) {
      const statusLabel: Record<string, string> = {
        pending: '🆕',
        contacted: '📞',
        confirmed: '✅',
        cancelled: '❌',
      }
      return {
        title: `${statusLabel[status as string] || ''} ${title || 'İsimsiz'}`,
        subtitle: `${tourName || ''} — ${date ? new Date(date as string).toLocaleString('tr-TR') : ''}`,
      }
    },
  },
})
