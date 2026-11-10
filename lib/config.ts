export const SITE_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://newlife-studio.vercel.app',
  waNumber: '33769892000',
  waText:
    "Bonjour Ilan ! Je viens de ton site et j'aimerais te parler de mon projet.",
  email: 'newlifee2k26@gmail.com',
} as const

/**
 * Performance mobile de CE site, affichée dans le hero sous la forme « 90+/100 » (choix de l'utilisateur, 2026-11-10) :
 * un plancher plutôt qu'un chiffre exact, pour ne pas le changer à chaque mesure.
 * Doit rester VRAI : Lighthouse mobile (médiane de 3) ≥ 90 sur l'accueil. Dernière mesure : 94 (2026-11-10).
 * Si une mesure passe sous 90, corriger le site (ou ce texte) avant de publier.
 */
export const PERF_FLOOR = 90

export function waLink(): string {
  return `https://wa.me/${SITE_CONFIG.waNumber}?text=${encodeURIComponent(
    SITE_CONFIG.waText
  )}`
}
