// Resend ile bildirim maili gönderir. RESEND_API_KEY yoksa sessizce atlar
// (kayıt Sanity'ye düştüğü için veri kaybolmaz).
export async function sendNotifyEmail(subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL
  if (!apiKey || !to) return false

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Ocak Turizm <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()),
        subject,
        html,
      }),
    })
    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('Resend fetch failed:', err)
    return false
  }
}

// Musteriye otomatik onay maili (e-posta verilmisse). Hata durumunda sessiz.
export async function sendCustomerEmail(to: string | undefined, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return false
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Ocak Turizm <onboarding@resend.dev>',
        to: [to],
        reply_to: process.env.NOTIFY_EMAIL?.split(',')[0]?.trim() || undefined,
        subject,
        html,
      }),
    })
    if (!res.ok) { console.error('Resend (customer) error:', res.status, await res.text()); return false }
    return true
  } catch (err) { console.error('Resend (customer) fetch failed:', err); return false }
}

export function customerLayout(name: string, intro: string, rows: [string, string][]): string {
  const trs = rows
    .map(([k, v]) => `<tr><td style="padding:8px 12px;background:#f6f7f9;font-weight:600;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 12px;white-space:pre-line">${v}</td></tr>`)
    .join('')
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111">
    <div style="background:#041A3D;color:#fff;padding:18px 20px;border-radius:8px 8px 0 0">
      <div style="font-size:20px;font-weight:700;letter-spacing:.5px">Ocak Turizm</div>
      <div style="font-size:12px;opacity:.8;margin-top:2px">Her yolculukta, önce âdem…</div>
    </div>
    <div style="padding:18px 20px;border:1px solid #e5e7eb;border-top:0">
      <p style="margin:0 0 10px">Merhaba ${esc(name)},</p>
      <p style="margin:0 0 14px">${intro}</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;font-size:14px">${trs}</table>
      <p style="margin:16px 0 6px">Sorularınız için bize doğrudan yazabilirsiniz:</p>
      <p style="margin:0">📞 WhatsApp / Telefon: <a href="https://wa.me/905550130571" style="color:#041A3D;font-weight:600">0555 013 0571</a><br>✉️ bilgi@ocakturizm.com<br>🌐 <a href="https://ocakturizm.com" style="color:#041A3D">ocakturizm.com</a></p>
    </div>
    <p style="color:#888;font-size:12px;margin-top:12px">Bu e-posta ocakturizm.com üzerinden yaptığınız talep üzerine otomatik gönderilmiştir.</p>
  </div>`
}

export function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function emailLayout(title: string, rows: [string, string][]): string {
  const trs = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;background:#f6f7f9;font-weight:600;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 12px;white-space:pre-line">${v}</td></tr>`
    )
    .join('')
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
    <div style="background:#041A3D;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0">
      <h2 style="margin:0;font-size:18px">${title}</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;font-size:14px;color:#111">${trs}</table>
    <p style="color:#888;font-size:12px;margin-top:12px">Bu mail ocakturizm.com üzerinden otomatik gönderildi.</p>
  </div>`
}
