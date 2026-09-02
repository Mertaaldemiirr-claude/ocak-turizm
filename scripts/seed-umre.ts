// Umre destinasyonu + 10 gunluk Umre turu kaydi (Kasim 2026)
// Calistirma: set -a; source .env.local; set +a; npx tsx scripts/seed-umre.ts <gorsel-klasoru>
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = createClient({
  projectId: '18og7o3d',
  dataset: 'production',
  apiVersion: '2026-07-14',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const DIR = process.argv[2]
if (!DIR) throw new Error('Gorsel klasoru verilmedi')

type Credit = { title: string; artist: string; license: string; source: string }
const credits: Record<string, Credit> = JSON.parse(readFileSync(join(DIR, 'credits.json'), 'utf-8'))

async function upload(file: string): Promise<string> {
  const c = credits[file]
  const asset = await client.assets.upload('image', readFileSync(join(DIR, file)), {
    filename: `umre-${file}`,
    creditLine: c ? `${c.artist} · ${c.license} · Wikimedia Commons` : undefined,
    source: c ? { name: 'wikimedia-commons', id: c.title, url: c.source } : undefined,
  })
  console.log(`  ${file} -> ${asset._id}`)
  return asset._id
}

const img = (ref: string, key?: string) => ({
  _type: 'image',
  ...(key ? { _key: key } : {}),
  asset: { _type: 'reference', _ref: ref },
})

async function main() {
  console.log('Gorseller yukleniyor...')
  const kabeGunduz = await upload('wm-kabe-tavaf.jpg')
  const kabeGece = await upload('wm-kabe-gece.jpg')
  const nebevi = await upload('wm-medine-nebevi.jpg')
  const kubbe = await upload('wm-medine-kubbe.jpg')
  const kuba = await upload('wm-kuba.jpg')
  const arafat = await upload('wm-arafat.jpg')

  console.log('Destinasyon yaziliyor...')
  await client.createOrReplace({
    _id: 'dest-umre',
    _type: 'destination',
    name: 'Umre',
    slug: { _type: 'slug', current: 'umre' },
    flag: '🕋',
    image: img(kabeGunduz),
    heroImage: img(kabeGece),
    description:
      'Mekke-i Mükerreme ve Medine-i Münevvere. Diyanet yetkili A grubu acente güvencesiyle, Türkçe rehberlik eşliğinde 10 günlük Umre programı.',
    order: 0,
  })

  console.log('Tur yaziliyor...')
  await client.createOrReplace({
    _id: 'tour-umre-kasim-2026',
    _type: 'tour',
    name: '10 Günlük Umre Programı',
    slug: { _type: 'slug', current: 'umre-programi-kasim-2026' },
    destination: { _type: 'reference', _ref: 'dest-umre' },
    image: img(kabeGunduz),
    heroImage: img(kabeGece),
    gallery: [
      img(kabeGunduz, 'g0'),
      img(kabeGece, 'g1'),
      img(nebevi, 'g2'),
      img(kubbe, 'g3'),
      img(kuba, 'g4'),
      img(arafat, 'g5'),
    ],
    days: 10,
    price: 1450,
    triplePrice: 1400,
    quadPrice: 1350,
    currency: 'USD',
    date: 'Kasım 2026 (10 gün)',
    startDate: '2026-11-20',
    cities: 'Mekke-i Mükerreme · Medine-i Münevvere',
    description:
      "Âdem'in hasretinden, Rabbin davetine... Ocak Turizm olarak hazırladığımız 10 günlük Umre programında; 7 gece Mekke-i Mükerreme, 3 gece Medine-i Münevvere'de konaklıyor, Kâbe-i Muazzama'da umre ibadetimizi eda ediyor, Ravza-i Mutahhara'da Efendimiz'i (sav) ziyaret ediyoruz. Sabiha Gökçen kalkışlı program; gidiş-dönüş uçak bileti, vize, otel, sabah-akşam yemekleri, Diyanet masrafları, transferler, Mekke ve Medine ziyaretleri, seyahat sigortası ve Ocak Turizm rehberliğiyle her şey dahil olarak sunulmaktadır. Diyanet yetkili A grubu seyahat acentası güvencesiyle.",
    program: [
      {
        _key: 'd1',
        day: 1,
        title: 'İstanbul (Sabiha Gökçen) – Cidde – Mekke',
        details:
          'Sabiha Gökçen Havalimanı\'nda buluşma ve ihramlı olarak uçuş. Cidde\'ye varış, özel araçlarla Mekke-i Mükerreme\'ye transfer ve otele yerleşme. Rehber eşliğinde Harem-i Şerif\'e geçiş, ilk tavaf ve umre ibadetinin edası (tavaf, sa\'y, tıraş).',
      },
      {
        _key: 'd2',
        day: 2,
        title: 'Mekke – Harem-i Şerif',
        details:
          'Vakit namazlarının Harem-i Şerif\'te kılınması. Rehber eşliğinde Harem\'in tarihi ve Kâbe\'nin kısımları hakkında bilgilendirme. Serbest ibadet zamanı.',
      },
      {
        _key: 'd3',
        day: 3,
        title: 'Mekke – Ziyaret Programı',
        details:
          'Arafat (Cebel-i Rahme), Müzdelife, Mina, Cebel-i Nur (Hira Mağarası) ve Cebel-i Sevr ziyaretleri. Cennetü\'l-Muallâ Kabristanı ve Cin Mescidi. Akşam Harem-i Şerif\'te ibadet.',
      },
      {
        _key: 'd4',
        day: 4,
        title: 'Mekke – Serbest İbadet',
        details:
          'Gün boyu Harem-i Şerif\'te ibadet. Dileyenler için rehber eşliğinde ikinci umre için Tenim Mescidi\'ne (mikat) gidiş.',
      },
      {
        _key: 'd5',
        day: 5,
        title: 'Mekke – Hudeybiye ve Cirane',
        details:
          'Hudeybiye ve Cirane mikat bölgelerine ziyaret, dileyenler için yeniden ihrama girip umre yapma imkânı. Akşam Harem-i Şerif\'te ibadet.',
      },
      {
        _key: 'd6',
        day: 6,
        title: 'Mekke – Serbest İbadet',
        details:
          'Gün boyu Harem-i Şerif\'te ibadet ve tavaf. Rehber eşliğinde sohbet programı.',
      },
      {
        _key: 'd7',
        day: 7,
        title: 'Mekke – Veda Tavafı – Medine',
        details:
          'Veda tavafının ardından otelden ayrılış. Özel araçlarla Medine-i Münevvere\'ye hareket (yaklaşık 4-5 saat). Otele yerleşme ve Mescid-i Nebevî\'de ilk namaz, Ravza-i Mutahhara ziyareti.',
      },
      {
        _key: 'd8',
        day: 8,
        title: 'Medine – Ziyaret Programı',
        details:
          'Kuba Mescidi, Kıbleteyn Mescidi, Yedi Mescidler (Hendek), Uhud Şehitliği ve Hz. Hamza (ra) kabri ziyaretleri. Cennetü\'l-Bâkî Kabristanı. Akşam Mescid-i Nebevî\'de ibadet.',
      },
      {
        _key: 'd9',
        day: 9,
        title: 'Medine – Serbest İbadet',
        details:
          'Gün boyu Mescid-i Nebevî\'de ibadet. Ravza-i Mutahhara\'da Efendimiz\'e (sav) selam. Serbest zaman ve hurma pazarı.',
      },
      {
        _key: 'd10',
        day: 10,
        title: 'Medine – İstanbul',
        details:
          'Sabah namazının ardından Mescid-i Nebevî\'ye veda. Medine Havalimanı\'na transfer ve İstanbul Sabiha Gökçen\'e dönüş uçuşu.',
      },
    ],
    included: [
      'İstanbul (Sabiha Gökçen) kalkışlı gidiş – dönüş uçak bileti',
      'Türkiye\'nin farklı şehirlerinden yurt içi bağlantılı uçuş imkânı',
      'Umre vizesi işlemleri',
      'Mekke\'de 7 gece, Medine\'de 3 gece Harem\'e servisli otellerde konaklama',
      'Her gün sabah kahvaltısı ve akşam yemeği',
      'Hediyelik umre seti',
      'Diyanet masrafları',
      'Havalimanı – otel – havalimanı ve şehirler arası tüm transferler',
      'Mekke ve Medine ziyaret programları',
      'Seyahat sağlık sigortası',
      'Ocak Turizm Türkçe rehberlik ve mihmandarlık hizmeti',
    ],
    excluded: [
      'Öğle yemekleri',
      'Şahsi harcamalar',
      'Program dışı ekstra ziyaret ve turlar',
      'Fazla bagaj ücretleri',
      'Kurban ve adak bedelleri',
    ],
    importantNotes: [
      'Kesin uçuş tarihi, havayolu programı netleştiğinde kayıtlı misafirlerimize bildirilir. Program Kasım 2026 içinde, 10 gün olarak gerçekleşecektir.',
      'Mekke ve Medine konaklama sıralaması uçuş planına göre değişiklik gösterebilir.',
      'Fiyatlar kişi başı ve oda tipine göredir: 2 kişilik oda 1.450 USD, 3 kişilik oda 1.400 USD, 4 kişilik oda 1.350 USD.',
      'Kayıt sırasında tur bedelinin %40\'ı kapora olarak alınır; kalan bakiye kalkıştan 1 ay önce tahsil edilir.',
      'Pasaportunuzun seyahat tarihinden itibaren en az 6 ay geçerlilik süresi bulunmalıdır.',
      'Programın gerçekleştirilebilmesi için minimum katılım sayısına ulaşılması gerekmektedir. Yeterli katılım sağlanamaması durumunda Ocak Turizm, programı erteleme veya iptal etme hakkını saklı tutar.',
      'Umre vizesi ve Diyanet işlemleri için gerekli belgeler kayıt sonrasında tarafınıza iletilir.',
      'Rehber; uçuş saatleri, resmî makamların uygulamaları ve Harem yoğunluğuna bağlı olarak program akışında değişiklik yapabilir.',
      'Ocak Turizm, Diyanet İşleri Başkanlığı tarafından yetkilendirilmiş A grubu seyahat acentasıdır (TÜRSAB 15938).',
    ],
    tourFaq: [
      {
        _key: 'f1',
        question: 'Oteller Harem\'e ne kadar uzaklıkta?',
        answer:
          'Mekke ve Medine\'de Harem\'e servisli otellerde konaklıyoruz. Vakit namazları için düzenli servis hizmeti sunulur; otel isimleri kayıt sonrasında bildirilir.',
      },
      {
        _key: 'f2',
        question: 'Vize işlemlerini kim yapıyor?',
        answer:
          'Umre vizesi ve Diyanet işlemlerinin tamamı Ocak Turizm tarafından yürütülür ve fiyata dahildir. Sizden yalnızca pasaport ve gerekli belgeleri talep ederiz.',
      },
      {
        _key: 'f3',
        question: 'Kesin tarih ne zaman belli olur?',
        answer:
          'Program Kasım 2026 içinde 10 gün olarak planlanmıştır. Havayolu programı kesinleştiğinde kalkış tarihi kayıtlı misafirlerimize WhatsApp ve telefonla bildirilir.',
      },
      {
        _key: 'f4',
        question: 'Ödeme nasıl yapılıyor?',
        answer:
          'Kayıt sırasında tur bedelinin %40\'ı kapora olarak alınır. Kalan bakiye kalkıştan 1 ay önce ödenir. Ödeme USD veya günün kuru üzerinden TL olarak yapılabilir.',
      },
      {
        _key: 'f5',
        question: 'Tek başıma katılabilir miyim?',
        answer:
          'Evet. Tek katılan misafirlerimizi aynı cinsiyetten diğer misafirlerle 3 veya 4 kişilik odalarda konaklatıyoruz; böylece tek kişi farkı ödemezsiniz.',
      },
      {
        _key: 'f6',
        question: 'Sakarya\'dan veya başka bir şehirden katılım mümkün mü?',
        answer:
          'Kalkış İstanbul Sabiha Gökçen Havalimanı\'ndandır. Türkiye\'nin farklı şehirlerinden yurt içi bağlantılı uçuşlar tarafımızca ayarlanır.',
      },
      {
        _key: 'f7',
        question: 'Yaşlı veya sağlık sorunu olan misafirler katılabilir mi?',
        answer:
          'Evet. Program yaşlı misafirlerimiz düşünülerek planlanır; rehberimiz ve mihmandarımız yolculuk boyunca yanınızdadır. Özel bir sağlık durumunuz varsa kayıt sırasında bize bildirmeniz yeterlidir.',
      },
    ],
    tourGroup: 'umre-programi',
    featured: true,
    order: 0,
  })

  console.log('Tamam.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
