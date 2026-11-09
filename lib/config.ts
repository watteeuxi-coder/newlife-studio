export const SITE_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://newlife-studio.vercel.app',
  waNumber: '33769892000',
  waText:
    "Bonjour Ilan ! Je viens de ton site et j'aimerais te parler de mon projet.",
  email: 'newlifee2k26@gmail.com',
} as const

/**
 * Score Lighthouse « Performance » mobile de l'accueil de CE site, affiché dans le hero.
 * Valeur MESURÉE uniquement (règle : aucun chiffre inventé) — à remesurer après chaque refonte visuelle.
 * Mesure : Lighthouse 12.6.1, mobile, médiane de 3 passages — de préférence sur l'URL de production.
 */
// Mesuré le 2026-11-09 en PRODUCTION (https://newlife-studio.vercel.app/) : 96 / 97 / 97 → médiane 97
export const PERF_SCORE = 97

export function waLink(): string {
  return `https://wa.me/${SITE_CONFIG.waNumber}?text=${encodeURIComponent(
    SITE_CONFIG.waText
  )}`
}
