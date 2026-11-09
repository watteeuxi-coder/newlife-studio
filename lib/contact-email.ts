// Mise en forme du champ « Email ou téléphone » dans l'email reçu par NEWLIFE STUDIO.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Chiffres, espaces, points, tirets, parenthèses, « + » en tête ; au moins 6 chiffres
const PHONE_RE = /^\+?[\d\s.\-()]+$/

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function isPhone(contact: string): boolean {
  return PHONE_RE.test(contact) && contact.replace(/\D/g, '').length >= 6
}

/** Email → lien mailto, téléphone → lien tel: (numéro nettoyé), sinon texte brut. Toujours échappé. */
export function contactHtml(contact: string): string {
  const safe = escapeHtml(contact)
  if (EMAIL_RE.test(contact)) {
    return `<a href="mailto:${safe}">${safe}</a> — réponds directement à cet email pour lui écrire.`
  }
  if (isPhone(contact)) {
    const tel = contact.trim().startsWith('+') ? `+${contact.replace(/\D/g, '')}` : contact.replace(/\D/g, '')
    return `<a href="tel:${tel}">${safe}</a>`
  }
  return safe
}
