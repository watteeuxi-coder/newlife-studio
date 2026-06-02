export const SITE_CONFIG = {
  waNumber: '33769892000',
  waText:
    "Bonjour NEWLIFE STUDIO ! Je viens de votre site et j'aimerais discuter de mon projet.",
  email: 'newlifee2k26@gmail.com',
} as const

export function waLink(): string {
  return `https://wa.me/${SITE_CONFIG.waNumber}?text=${encodeURIComponent(
    SITE_CONFIG.waText
  )}`
}
