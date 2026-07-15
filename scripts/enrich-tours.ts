import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { basename } from 'path'

const client = createClient({
  projectId: '18og7o3d',
  dataset: 'production',
  apiVersion: '2026-07-14',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const IMAGES_DIR = '/Users/mertaldemir/Desktop/ocak-turizm/public/images'

async function uploadImage(filePath: string): Promise<string> {
  const buffer = readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: basename(filePath),
  })
  console.log(`  Uploaded: ${basename(filePath)} -> ${asset._id}`)
  return asset._id
}

async function enrichTours() {
  console.log('Enriching tours with images and content...\n')

  // Get existing tours
  const tours = await client.fetch(`*[_type == "tour"] { _id, name }`)
  const tourMap: Record<string, string> = {}
  for (const t of tours) {
    tourMap[t.name] = t._id
  }

  // Get existing destinations
  const destinations = await client.fetch(`*[_type == "destination"] { _id, name }`)
  const destMap: Record<string, string> = {}
  for (const d of destinations) {
    destMap[d.name] = d._id
  }

  // Upload card images
  console.log('Uploading card images...')
  const misirCard = await uploadImage(`${IMAGES_DIR}/misir-card-new.jpg`)
  const fasCard = await uploadImage(`${IMAGES_DIR}/fas-card-new.jpg`)
  const ozbCard = await uploadImage(`${IMAGES_DIR}/ozbekistan-card-new.jpg`)
  const bosnaCard = await uploadImage(`${IMAGES_DIR}/bosna-card-new.jpg`)
  const nileCard = await uploadImage(`${IMAGES_DIR}/experience-nile.jpg`)
  const saharaCard = await uploadImage(`${IMAGES_DIR}/experience-sahara.jpg`)

  // Upload hero images
  console.log('Uploading hero images...')
  const misirHero = await uploadImage(`${IMAGES_DIR}/misir-hero-new.jpg`)
  const fasHero = await uploadImage(`${IMAGES_DIR}/fas-hero-new.jpg`)
  const ozbHero = await uploadImage(`${IMAGES_DIR}/ozbekistan-hero-new.jpg`)
  const bosnaHero = await uploadImage(`${IMAGES_DIR}/bosna-hero-new.jpg`)

  // Upload destination images
  console.log('\nUpdating destination images...')
  await client.patch(destMap['Misir']).set({
    image: { _type: 'image', asset: { _type: 'reference', _ref: misirCard } },
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: misirHero } },
  }).commit()
  await client.patch(destMap['Fas']).set({
    image: { _type: 'image', asset: { _type: 'reference', _ref: fasCard } },
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: fasHero } },
  }).commit()
  await client.patch(destMap['Ozbekistan']).set({
    image: { _type: 'image', asset: { _type: 'reference', _ref: ozbCard } },
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: ozbHero } },
  }).commit()
  await client.patch(destMap['Bosna Hersek']).set({
    image: { _type: 'image', asset: { _type: 'reference', _ref: bosnaCard } },
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: bosnaHero } },
  }).commit()
  console.log('Destination images updated\n')

  // Enrich each tour
  const tourData: Record<string, {
    cardImage: string, heroImage: string, description: string,
    program: { _key: string, day: number, title: string, details: string }[],
    included: string[], excluded: string[]
  }> = {
    'Buyuk Misir Turu': {
      cardImage: misirCard,
      heroImage: misirHero,
      description: 'Firavunlarin izinde, Nil Nehri\'nin kiyisinda, Islam medeniyetinin en onemli merkezlerinden birinde unutulmaz bir yolculuk. Kahire\'nin kaotik guzelliginden Luksor\'un tapinaklar vadisine, Hz. Huseyin Camii\'nden El-Ezher\'e kadar Misir\'in tum ihtisami bu turda.',
      program: [
        { _key: 'd1', day: 1, title: 'Istanbul → Kahire', details: 'Havalimani transferi, otele yerlesme. Aksam yemegi ve serbest zaman.' },
        { _key: 'd2', day: 2, title: 'Kahire Sehir Turu', details: 'Misir Muzesi, Tahrir Meydani, Khan el-Khalili Carsisi. Hz. Huseyin Camii ziyareti ve namaz. Aksam Nil kiyisinda yemek.' },
        { _key: 'd3', day: 3, title: 'Piramitler & Sfenks', details: 'Giza Piramitleri, Buyuk Sfenks, Panoramik fotograf molasi. Ogleden sonra Eski Kahire: Amr bin As Camii, Mu\'allaka Kilisesi.' },
        { _key: 'd4', day: 4, title: 'Kahire → Luksor', details: 'Ucakla Luksor\'a gecis. Karnak Tapinagi, Luksor Tapinagi. Aksam serbest zaman.' },
        { _key: 'd5', day: 5, title: 'Krallar Vadisi', details: 'Krallar Vadisi, Hatshepsut Tapinagi, Memnon Heykelleri. Nil uzerinde feluka turu.' },
        { _key: 'd6', day: 6, title: 'El-Ezher & Serbest Gun', details: 'Sabah El-Ezher Camii ve Universitesi ziyareti. Ogleden sonra alisveris ve serbest zaman.' },
        { _key: 'd7', day: 7, title: 'Kahire → Istanbul', details: 'Sabah kahvaltisi sonrasi havalimani transferi. Istanbul\'a donus.' },
      ],
      included: ['Gidis-donus ucak bileti', 'Helal konsept 4 yildizli otel konaklamasi', 'Sabah kahvaltilari ve aksam yemekleri', 'Turkce rehberlik hizmeti', 'Tum museum ve orenyeri giris ucretleri', 'VIP arac ile transferler', 'Nil feluka turu', 'Seyahat saglik sigortasi'],
      excluded: ['Ogle yemekleri', 'Kisisel harcamalar', 'Otel ekstra masraflari', 'Yurt disi cikis harc pulu'],
    },
    'Fas Kesfet Turu': {
      cardImage: fasCard,
      heroImage: fasHero,
      description: 'Fas\'in buyuleyici kralik sehirlerini, Sahara Colu\'nun yildizli gecelerini ve Islam medeniyetinin nadide eserlerini kesfettiginiz ozel bir yolculuk. Karaviyyin Medresesi\'nden Kutubiyye Camii\'ne, Marakes\'in renkli sokaklarindan Sahara\'nin sessizligine.',
      program: [
        { _key: 'd1', day: 1, title: 'Istanbul → Marakes', details: 'Havalimani karsilama ve otele transfer. Aksam Djemaa el-Fna Meydani gezisi.' },
        { _key: 'd2', day: 2, title: 'Marakes Sehir Turu', details: 'Kutubiyye Camii, Bahia Sarayi, Saadian Turbeleri, Majorelle Bahcesi. Ogleden sonra geleneksel carsi gezisi.' },
        { _key: 'd3', day: 3, title: 'Marakes → Sahara', details: 'Atlas Daglari gecisi, Ait Ben Haddou Kalesi (UNESCO). Aksam col kampinda yildizlarin altinda konaklama.' },
        { _key: 'd4', day: 4, title: 'Sahara → Fes', details: 'Sabah deve safari. Ogleden sonra Fes\'e hareket. Aksam otele yerlesme.' },
        { _key: 'd5', day: 5, title: 'Fes & Donus', details: 'Karaviyyin Medresesi, Bou Inania Medresesi, Chouara Tabakhaneleri. Ogleden sonra havalimani transferi, Istanbul\'a donus.' },
      ],
      included: ['Gidis-donus ucak bileti', 'Helal konsept 4 yildizli otel konaklamasi', 'Sahara col kampi (1 gece)', 'Kahvaltilar ve aksam yemekleri', 'Turkce rehberlik', 'Tum giris ucretleri', 'Deve safari', 'VIP transfer', 'Seyahat sigortasi'],
      excluded: ['Ogle yemekleri', 'Kisisel harcamalar', 'Vize ucreti (gerekirse)', 'Yurt disi cikis harc pulu'],
    },
    'Buyuk Ozbekistan Turu': {
      cardImage: ozbCard,
      heroImage: ozbHero,
      description: 'Ipek Yolu\'nun kalbinde, Timur Imparatorlugu\'nun ihtisami ve Islam alimlerinin izinde bir yolculuk. Semerkant\'in turkuaz kubbelerinden Buhara\'nin tarihi medreselerine, Imam Buhari hazretlerinin turbesine kadar Orta Asya\'nin manevi mirasini kesfedeceksiniz.',
      program: [
        { _key: 'd1', day: 1, title: 'Istanbul → Taskent', details: 'Havalimani karsilama ve otele transfer. Serbest zaman.' },
        { _key: 'd2', day: 2, title: 'Taskent → Semerkant', details: 'Hizli trenle Semerkant\'a gecis. Registan Meydani, Ulugbek Medresesi, Sher-Dor Medresesi. Aksam yemegi.' },
        { _key: 'd3', day: 3, title: 'Semerkant', details: 'Gur-e Amir (Timur Turbesi), Bibi-Hanim Camii, Shah-i Zinda nekropolisi. Ogleden sonra Siab Pazari.' },
        { _key: 'd4', day: 4, title: 'Semerkant → Buhara', details: 'Imam Buhari turbesi ziyareti. Ogleden sonra Buhara\'ya hareket. Aksam Lyab-i Hauz meydaninda yemek.' },
        { _key: 'd5', day: 5, title: 'Buhara Sehir Turu', details: 'Kalon Minaresi, Mir-i Arab Medresesi, Ark Kalesi, Ismail Samani Turbesi, Chor-Minor. Alisveris ve serbest zaman.' },
        { _key: 'd6', day: 6, title: 'Buhara → Istanbul', details: 'Sabah son geziler ve hediyelik alisverisi. Havalimani transferi ve Istanbul\'a donus.' },
      ],
      included: ['Gidis-donus ucak bileti', '4 yildizli helal otel konaklamasi', 'Taskent-Semerkant hizli tren bileti', 'Kahvaltilar ve aksam yemekleri', 'Turkce rehberlik', 'Tum giris ucretleri', 'VIP transfer', 'Seyahat sigortasi'],
      excluded: ['Ogle yemekleri', 'Kisisel harcamalar', 'Yurt disi cikis harc pulu'],
    },
    'Bosna Hersek Turu': {
      cardImage: bosnaCard,
      heroImage: bosnaHero,
      description: 'Osmanli mirasinin Avrupa\'daki en canli izlerini tasiyan Bosna Hersek\'te, tarih, inanc ve dogayi bir arada yasayacaginiz ozel bir tur. Gazi Husrev Bey Camii\'nde cuma namazi, Mostar Koprusu\'nde ezan sesi, Saraybosna\'nin ruhunda Osmanli.',
      program: [
        { _key: 'd1', day: 1, title: 'Istanbul → Saraybosna', details: 'Havalimani karsilama. Bascarsija yuruyus turu, Gazi Husrev Bey Camii, Sebilj Cesmesi. Aksam yemegi.' },
        { _key: 'd2', day: 2, title: 'Saraybosna Sehir Turu', details: 'Latin Koprusu, Sehitlik ziyareti, Tunel Muzesi, Vijecnica (Belediye Binasi). Ogleden sonra Vrelo Bosne tabiat parki.' },
        { _key: 'd3', day: 3, title: 'Mostar & Blagaj', details: 'Mostar Koprusu, Koski Mehmet Pasa Camii, Eski Carsi. Blagaj Tekkesi ziyareti. Buna Nehri kiyisinda ogle yemegi.' },
        { _key: 'd4', day: 4, title: 'Saraybosna → Istanbul', details: 'Sabah serbest zaman ve son alisverisler. Havalimani transferi, Istanbul\'a donus.' },
      ],
      included: ['Gidis-donus ucak bileti', '4 yildizli helal otel konaklamasi', 'Kahvaltilar ve aksam yemekleri', 'Turkce rehberlik', 'Tum giris ucretleri', 'VIP transfer', 'Seyahat sigortasi'],
      excluded: ['Ogle yemekleri', 'Kisisel harcamalar', 'Yurt disi cikis harc pulu'],
    },
    'Nil Kruvaziyer Ozel': {
      cardImage: nileCard,
      heroImage: misirHero,
      description: 'Nil Nehri uzerinde 4 gecelik ozel kruvaziyer yolculugu ile Misir\'in antik hazinelerini kesfedeceksiniz. Luksor\'dan Asvan\'a uzanan bu yolculukta firavunlarin tapinaklerini, Nil\'in huzurunu ve El-Ezher Camii\'nin manevi atmosferini bir arada yasayacaksiniz.',
      program: [
        { _key: 'd1', day: 1, title: 'Istanbul → Kahire', details: 'Havalimani karsilama ve otele transfer. Aksam yemegi.' },
        { _key: 'd2', day: 2, title: 'Kahire Sehir Turu', details: 'Giza Piramitleri, Sfenks, Misir Muzesi. Hz. Huseyin Camii ziyareti.' },
        { _key: 'd3', day: 3, title: 'Kahire → Luksor (Kruvaziyer)', details: 'Ucakla Luksor\'a gecis. Kruvaziyer gemisine binis. Karnak Tapinagi.' },
        { _key: 'd4', day: 4, title: 'Luksor - Krallar Vadisi', details: 'Krallar Vadisi, Hatshepsut Tapinagi. Ogleden sonra Nil\'de yolculuk.' },
        { _key: 'd5', day: 5, title: 'Edfu & Kom Ombo', details: 'Horus Tapinagi (Edfu), Kom Ombo Tapinagi. Nil manzarasi esliginde ogle yemegi.' },
        { _key: 'd6', day: 6, title: 'Asvan', details: 'Asvan Baraji, Philae Tapinagi. Ogleden sonra feluka turu.' },
        { _key: 'd7', day: 7, title: 'Asvan → Kahire', details: 'Ucakla Kahire\'ye donus. El-Ezher Camii ve Universitesi ziyareti.' },
        { _key: 'd8', day: 8, title: 'Serbest Gun', details: 'Khan el-Khalili carsisinda alisveris ve serbest zaman.' },
        { _key: 'd9', day: 9, title: 'Kahire → Istanbul', details: 'Sabah serbest zaman. Ogleden sonra havalimani transferi.' },
        { _key: 'd10', day: 10, title: 'Istanbul\'a Varis', details: 'Gece ucusu ile Istanbul\'a varis. Havalimani transferi.' },
      ],
      included: ['Gidis-donus ucak bileti', 'Kahire 4 yildizli otel (3 gece)', 'Nil Kruvaziyeri full board (4 gece)', 'Ic hat ucus biletleri', 'Tum kahvalti, ogle ve aksam yemekleri (kruvaziyer)', 'Turkce rehberlik', 'Tum giris ucretleri', 'Feluka turu', 'VIP transfer', 'Seyahat sigortasi'],
      excluded: ['Karada ogle yemekleri', 'Kisisel harcamalar', 'Otel ekstra masraflari', 'Yurt disi cikis harc pulu'],
    },
    'Sahara Col Macerasi': {
      cardImage: saharaCard,
      heroImage: fasHero,
      description: 'Fas\'in en etkileyici rotalarinda 8 gunluk macera dolu bir yolculuk. Atlas Daglari\'nin karli zirveleri, Sahara\'nin sonsuz kum tepeleri, Marakes\'in buyuleyici sokaklari ve Fes\'in tarihi medreseleri tek turda.',
      program: [
        { _key: 'd1', day: 1, title: 'Istanbul → Marakes', details: 'Havalimani karsilama ve otele transfer.' },
        { _key: 'd2', day: 2, title: 'Marakes Sehir Turu', details: 'Kutubiyye Camii, Bahia Sarayi, Majorelle Bahcesi, Djemaa el-Fna.' },
        { _key: 'd3', day: 3, title: 'Atlas Daglari', details: 'Yuksek Atlas gecisi, Berber koyleri ziyareti, panoramik manzaralar.' },
        { _key: 'd4', day: 4, title: 'Ait Ben Haddou → Sahara', details: 'UNESCO Mirasi Ait Ben Haddou. Aksam col kampina varis, deve safari.' },
        { _key: 'd5', day: 5, title: 'Sahara Deneyimi', details: 'Gun dogumu izleme, col yuruyusu. Ogleden sonra Todra Bogazina hareket.' },
        { _key: 'd6', day: 6, title: 'Todra → Ifrane → Fes', details: 'Todra Bogazi, Ifrane (Afrika\'nin Isvicre\'si). Aksam Fes\'e varis.' },
        { _key: 'd7', day: 7, title: 'Fes Sehir Turu', details: 'Karaviyyin Medresesi, Bou Inania, Chouara Tabakhaneleri, Mellah.' },
        { _key: 'd8', day: 8, title: 'Fes → Istanbul', details: 'Sabah serbest zaman. Havalimani transferi ve Istanbul\'a donus.' },
      ],
      included: ['Gidis-donus ucak bileti', '4 yildizli helal otel konaklamasi', 'Sahara col kampi (1 gece)', 'Kahvaltilar ve aksam yemekleri', 'Deve safari', 'Turkce rehberlik', 'Tum giris ucretleri', 'VIP transfer', 'Seyahat sigortasi'],
      excluded: ['Ogle yemekleri', 'Kisisel harcamalar', 'Vize ucreti (gerekirse)', 'Yurt disi cikis harc pulu'],
    },
  }

  // Apply updates
  for (const [tourName, data] of Object.entries(tourData)) {
    const tourId = tourMap[tourName]
    if (!tourId) {
      console.log(`Tour not found: ${tourName}`)
      continue
    }

    console.log(`\nUpdating: ${tourName}`)
    await client.patch(tourId).set({
      image: { _type: 'image', asset: { _type: 'reference', _ref: data.cardImage } },
      heroImage: { _type: 'image', asset: { _type: 'reference', _ref: data.heroImage } },
      description: data.description,
      program: data.program,
      included: data.included,
      excluded: data.excluded,
    }).commit()
    console.log(`  Done: ${tourName}`)
  }

  console.log('\n\nAll tours enriched!')
}

enrichTours().catch(console.error)
