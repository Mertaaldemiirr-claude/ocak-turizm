import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ocak Turizm')
    .items([
      S.listItem()
        .title('Site Ayarlari')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('tour').title('Turlar'),
      S.documentTypeListItem('destination').title('Destinasyonlar'),
      S.divider(),
      S.documentTypeListItem('blogPost').title('Blog Yazilari'),
      S.documentTypeListItem('page').title('Sayfalar'),
      S.divider(),
      S.documentTypeListItem('testimonial').title('Musteri Yorumlari'),
      S.documentTypeListItem('faq').title('Sikca Sorulan Sorular'),
      S.divider(),
      S.documentTypeListItem('galleryImage').title('Galeri Gorselleri'),
    ])
