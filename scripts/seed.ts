import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '18og7o3d',
  dataset: 'production',
  apiVersion: '2026-07-14',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('Seeding Sanity...')

  // 1. Destinations
  const destinations = [
    { name: 'Misir', flag: '\u{1F1EA}\u{1F1EC}', order: 1 },
    { name: 'Fas', flag: '\u{1F1F2}\u{1F1E6}', order: 2 },
    { name: 'Ozbekistan', flag: '\u{1F1FA}\u{1F1FF}', order: 3 },
    { name: 'Bosna Hersek', flag: '\u{1F1E7}\u{1F1E6}', order: 4 },
  ]

  const destIds: Record<string, string> = {}
  for (const dest of destinations) {
    const doc = await client.create({
      _type: 'destination',
      name: dest.name,
      slug: { _type: 'slug', current: dest.name.toLowerCase().replace(/\s+/g, '-') },
      flag: dest.flag,
      order: dest.order,
    })
    destIds[dest.name] = doc._id
    console.log(`Destination: ${dest.name} -> ${doc._id}`)
  }

  // 2. Tours
  const tours = [
    {
      name: 'Buyuk Misir Turu',
      days: 7,
      date: '15-21 Agustos 2026',
      price: 899,
      cities: 'Kahire \u00B7 Luksor \u00B7 Nil \u00B7 Hz. Huseyin Camii',
      dest: 'Misir',
      featured: true,
      order: 1,
    },
    {
      name: 'Fas Kesfet Turu',
      days: 5,
      date: '20-24 Eylul 2026',
      price: 749,
      cities: 'Marakes \u00B7 Fes \u00B7 Sahara \u00B7 Karaviyyin Medresesi',
      dest: 'Fas',
      featured: true,
      order: 2,
    },
    {
      name: 'Buyuk Ozbekistan Turu',
      days: 6,
      date: '10-15 Ekim 2026',
      price: 699,
      cities: 'Semerkant \u00B7 Buhara \u00B7 Hive \u00B7 Imam Buhari Turbe',
      dest: 'Ozbekistan',
      featured: true,
      order: 3,
    },
    {
      name: 'Bosna Hersek Turu',
      days: 4,
      date: '5-8 Kasim 2026',
      price: 549,
      cities: 'Saraybosna \u00B7 Mostar \u00B7 Gazi Husrev Bey Camii',
      dest: 'Bosna Hersek',
      featured: true,
      order: 4,
    },
    {
      name: 'Nil Kruvaziyer Ozel',
      days: 10,
      date: '1-10 Aralik 2026',
      price: 1199,
      cities: 'Kahire \u00B7 Luksor \u00B7 Asvan \u00B7 El-Ezher Camii',
      dest: 'Misir',
      featured: true,
      order: 5,
    },
    {
      name: 'Sahara Col Macerasi',
      days: 8,
      date: '12-19 Ocak 2027',
      price: 899,
      cities: 'Marakes \u00B7 Sahara \u00B7 Fes \u00B7 Kutubiyye Camii',
      dest: 'Fas',
      featured: true,
      order: 6,
    },
  ]

  for (const tour of tours) {
    const doc = await client.create({
      _type: 'tour',
      name: tour.name,
      slug: { _type: 'slug', current: tour.name.toLowerCase().replace(/\s+/g, '-') },
      days: tour.days,
      date: tour.date,
      price: tour.price,
      cities: tour.cities,
      featured: tour.featured,
      order: tour.order,
      destination: { _type: 'reference', _ref: destIds[tour.dest] },
    })
    console.log(`Tour: ${tour.name} -> ${doc._id}`)
  }

  // 3. Testimonials
  const testimonials = [
    { name: 'Ayse K.', tour: 'Misir Turu', text: 'Helal yemek konusunda hic sikinti yasanmadi. Hz. Huseyin Camii\'nde namaz kilmak ayri bir heyecan. Ailemle gonul rahatligiyla gittik, elinize saglik.', order: 1 },
    { name: 'Mehmet Y.', tour: 'Bosna Hersek Turu', text: 'Gazi Husrev Bey Camii\'nde cuma namazi kildik, Mostar\'da ezan sesi esliginde kopruden izledik. Osmanli izlerini yerinde gormek baska bir duygu.', order: 2 },
    { name: 'Fatma S.', tour: 'Fas Turu', text: 'Karaviyyin Medresesi\'ni gormek listemizdeydi. Sahrada yildizlarin altinda kalmak, helal yemekler, huzurlu bir ortam. Her seyi dusunmusler.', order: 3 },
    { name: 'Ali D.', tour: 'Ozbekistan Turu', text: 'Imam Buhari hazretlerinin turbesini ziyaret etmek cok anlamliydi. Semerkant medreseleri, Buhara\'nin manevi atmosferi... Kesinlikle gidin.', order: 4 },
    { name: 'Zeynep T.', tour: 'Misir Turu', text: 'Namaz vakitlerine gore program yapilmasi bizi cok rahatlatti. El-Ezher Camii\'nde vakit namazi kilmak, Nil\'de huzurlu bir yolculuk. Herkese tavsiye ederim.', order: 5 },
    { name: 'Hasan B.', tour: 'Bosna Hersek Turu', text: 'Uc kez gittik, her seferinde ayni hassasiyet. Alkolsuz otel, helal mutfak, namaz molalari — ailece rahat ettik. Guvenilir ve samimi bir ekip.', order: 6 },
  ]

  for (const t of testimonials) {
    await client.create({
      _type: 'testimonial',
      name: t.name,
      tour: t.tour,
      text: t.text,
      rating: 5,
      order: t.order,
    })
    console.log(`Testimonial: ${t.name}`)
  }

  // 4. FAQs
  const faqs = [
    { question: 'Turlarda helal yemek garantisi var mi?', answer: 'Evet, tum turlarimizda helal yemek garantisi sunuyoruz. Oteller ve restoranlar helal mutfak sertifikasina gore secilir. Domuz eti iceren urunler kesinlikle bulunmaz.' },
    { question: 'Namaz vakitleri tur programina dahil mi?', answer: 'Kesinlikle. Tur programlarimiz namaz vakitlerine gore planlanir. Her mola noktasinda yakindaki camiler belirlenir ve namaz icin yeterli sure ayrilir.' },
    { question: 'Otellerde alkol servisi var mi?', answer: 'Mumkun oldugunca alkolsuz oteller tercih ediyoruz. Bazi destinasyonlarda tamamen alkolsuz otel bulunamayabilir; bu durumda odada minibar bos olarak ayarlanir ve alkol servisi yapilmayan katlar tercih edilir.' },
    { question: 'Kadinlar icin ayri havuz veya plaj imkani var mi?', answer: 'Destinasyona gore kadinlara ozel havuz veya plaj saatleri olan oteller tercih ediyoruz. Detayli bilgi icin ilgilendiginiz turu sorun, size en uygun secenegi sunalim.' },
    { question: 'Rezervasyon nasil yapilir?', answer: 'Web sitemizdeki formu doldurarak veya WhatsApp uzerinden bize ulasarak kolayca rezervasyon yapabilirsiniz. Talebiniz alinir alinmaz sizinle iletisime geceriz.' },
    { question: 'Tur fiyatlarina neler dahildir?', answer: 'Ucak bileti, helal konaklama, transferler, Turkce rehberlik hizmeti ve tur programindaki tum geziler dahildir. Detayli bilgi her turun kendi sayfasinda belirtilmektedir.' },
    { question: 'Odeme yontemleri nelerdir?', answer: 'Banka havalesi/EFT, kredi karti ve taksitli odeme seceneklerimiz mevcuttur. Odeme plani hakkinda detayli bilgi icin bizimle iletisime gecebilirsiniz.' },
    { question: 'Iptal ve iade kosullari nelerdir?', answer: 'Tur baslangicina 30 gun kala yapilan iptallerde tam iade, 15-30 gun arasi %50 iade, 15 gunden az kala iade yapilmamaktadir. Mucbir sebepler haric tum iptallerde bu kosullar gecerlidir.' },
  ]

  for (let i = 0; i < faqs.length; i++) {
    await client.create({
      _type: 'faq',
      question: faqs[i].question,
      answer: faqs[i].answer,
      order: i + 1,
    })
    console.log(`FAQ: ${faqs[i].question.slice(0, 40)}...`)
  }

  // 5. Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    phone: '+90 555 123 4567',
    email: 'info@ocakturizm.com',
    address: 'Istanbul, Turkiye',
    whatsapp: '905551234567',
    tursabNo: 'XXXXX',
    heroTagline: 'Evliya Celebi olsaydi bizimle gezerdi',
    heroTitle: 'Gonul rahatligiyla dunyanin guzelliklerini kesfedin',
    heroSubtitle: 'Aile dostu, ozenle planlanmis turlar ile unutulmaz seyahat deneyimleri.',
  })
  console.log('Site Settings created')

  console.log('\nSeed complete!')
}

seed().catch(console.error)
