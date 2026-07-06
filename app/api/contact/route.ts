import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/config'

/**
 * Envoi d'email via l'API REST de Resend (https://resend.com) — aucune dépendance.
 * Variables d'environnement à définir (local : .env.local / prod : Vercel → Settings → Environment Variables) :
 *   RESEND_API_KEY    — clé API Resend (obligatoire)
 *   CONTACT_TO_EMAIL  — destinataire (optionnel, défaut : SITE_CONFIG.email)
 *   CONTACT_FROM      — expéditeur vérifié chez Resend (optionnel, défaut : onboarding@resend.dev)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: Request) {
  let body: { name?: string; contact?: string; message?: string; company?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  // Honeypot : les bots remplissent ce champ caché, on fait semblant que tout va bien
  if (body.company) {
    return NextResponse.json({ ok: true })
  }

  const name = body.name?.trim() ?? ''
  const contact = body.contact?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (!name || !contact || !message) {
    return NextResponse.json({ error: 'Merci de remplir tous les champs.' }, { status: 400 })
  }
  if (name.length > 100 || contact.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Message trop long.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "L'envoi d'email n'est pas encore configuré — écris-nous sur WhatsApp !" },
      { status: 503 }
    )
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE_CONFIG.email
  const from = process.env.CONTACT_FROM || 'NEWLIFE STUDIO <onboarding@resend.dev>'

  const html = `
    <h2>Nouveau message depuis le site NEWLIFE STUDIO</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Contact :</strong> ${escapeHtml(contact)}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nouveau prospect : ${name}`,
      html,
      ...(EMAIL_RE.test(contact) ? { reply_to: contact } : {}),
    }),
  })

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text())
    return NextResponse.json(
      { error: "L'envoi a échoué — réessaie ou écris-nous sur WhatsApp." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
