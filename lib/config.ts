export const SITE_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://newlife-studio.vercel.app',
  waNumber: '33769892000',
  waText:
    "Bonjour NEWLIFE STUDIO ! Je viens de votre site et j'aimerais discuter de mon projet.",
  email: 'newlifee2k26@gmail.com',
} as const

/**
 * Score Lighthouse « Performance » mobile de l'accueil de CE site, affiché dans le hero.
 * Valeur MESURÉE uniquement (règle : aucun chiffre inventé) — à remesurer après chaque refonte visuelle.
 * Mesure : Lighthouse 12.6.1, mobile, build de prod local, médiane de 3 passages.
 */
// Mesuré le 2026-11-09 sur le build final de la refonte claire de l'accueil : 95 / 95 / 94 → médiane 95
export const PERF_SCORE = 95

export function waLink(): string {
  return `https://wa.me/${SITE_CONFIG.waNumber}?text=${encodeURIComponent(
    SITE_CONFIG.waText
  )}`
}
