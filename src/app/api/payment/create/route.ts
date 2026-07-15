import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { createPaytrToken } from '@/lib/paytr'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, customerPhone, customerEmail, tourName, destination, tourDate, peopleCount, message, amount } = body

    if (!customerName || !customerPhone || !tourName || !destination || !amount) {
      return Response.json({ error: 'Eksik bilgi' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Benzersiz siparis ID
    const merchantOid = `OT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    // Supabase'e rezervasyon kaydet
    const { error: dbError } = await supabase.from('reservations').insert({
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      tour_name: tourName,
      destination,
      tour_date: tourDate || null,
      people_count: peopleCount || 1,
      message: message || null,
      amount,
      payment_status: 'pending',
      paytr_merchant_oid: merchantOid,
    })

    if (dbError) {
      console.error('DB error:', dbError)
      return Response.json({ error: 'Veritabani hatasi' }, { status: 500 })
    }

    // PayTR token olustur
    const userIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'

    const paytrParams = createPaytrToken({
      merchantOid,
      amount,
      customerName,
      customerEmail: customerEmail || 'musteri@ocakturizm.com',
      customerPhone,
      userIp,
      tourName,
    })

    // PayTR iframe token al
    const formData = new URLSearchParams()
    for (const [key, value] of Object.entries(paytrParams)) {
      formData.append(key, value)
    }

    const paytrResponse = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })

    const paytrResult = await paytrResponse.json()

    if (paytrResult.status === 'success') {
      return Response.json({
        token: paytrResult.token,
        merchantOid,
      })
    } else {
      console.error('PayTR error:', paytrResult)
      return Response.json({ error: 'Odeme sistemi hatasi', details: paytrResult.reason }, { status: 500 })
    }
  } catch (error) {
    console.error('Payment create error:', error)
    return Response.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
