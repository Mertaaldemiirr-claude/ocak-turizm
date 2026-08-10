import { defineField, defineType } from 'sanity'

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'İletişim Mesajı',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Ad Soyad', type: 'string' }),
    defineField({ name: 'email', title: 'E-posta', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'message', title: 'Mesaj', type: 'text', rows: 6 }),
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
    select: { title: 'name', msg: 'message', date: 'receivedAt' },
    prepare({ title, msg, date }) {
      return {
        title: title || 'İsimsiz',
        subtitle: `${(msg || '').slice(0, 60)} — ${date ? new Date(date as string).toLocaleString('tr-TR') : ''}`,
      }
    },
  },
})
