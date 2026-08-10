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
