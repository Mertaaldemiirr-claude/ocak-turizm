import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyPaytrCallback } from '@/lib/paytr'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const merchantOid = formData.get('merchant_oid') as string
    const status = formData.get('status') as string
    const totalAmount = formData.get('total_amount') as string
    const hash = formData.get('hash') as string

    // Hash dogrulama
    if (!verifyPaytrCallback(merchantOid, status, totalAmount, hash)) {
      return new Response('PAYTR notification failed: bad hash', { status: 400 })
    }

    const supabase = createServiceClient()
    if (!supabase) {
      return new Response('Payment system not configured', { status: 503 })
    }

    if (status === 'success') {
      // Odeme basarili — rezervasyonu guncelle
      await supabase
        .from('reservations')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
        })
        .eq('paytr_merchant_oid', merchantOid)

      // Musteri kaydini guncelle veya olustur
      const { data: reservation } = await supabase
        .from('reservations')
        .select('customer_name, customer_phone, customer_email, amount')
        .eq('paytr_merchant_oid', merchantOid)
        .single()

      if (reservation) {
        const { data: existing } = await supabase
          .from('customers')
          .select('id, total_orders, total_spent')
          .eq('phone', reservation.customer_phone)
          .single()

        if (existing) {
          await supabase
            .from('customers')
            .update({
              total_orders: existing.total_orders + 1,
              total_spent: Number(existing.total_spent) + Number(reservation.amount),
            })
            .eq('id', existing.id)
        } else {
          await supabase.from('customers').insert({
            name: reservation.customer_name,
            phone: reservation.customer_phone,
            email: reservation.customer_email,
            total_orders: 1,
            total_spent: reservation.amount,
          })
        }
      }
    } else {
      // Odeme basarisiz
      await supabase
        .from('reservations')
        .update({ payment_status: 'failed' })
        .eq('paytr_merchant_oid', merchantOid)
    }

    // PayTR'ye OK yaniti (zorunlu)
    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('PayTR callback error:', error)
    return new Response('OK', { status: 200 })
  }
}
