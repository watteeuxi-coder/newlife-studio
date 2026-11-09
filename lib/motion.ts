// Apparition au scroll, commune à tout le site : fondu + légère montée (opacity et transform uniquement).
// prefers-reduced-motion : <MotionConfig reducedMotion="user"> (layout) retire la montée, garde le fondu.
export const EASE = [0.22, 1, 0.36, 1] as const

const VIEWPORT = { once: true, margin: '-10% 0px' } as const

/** Titre de section (kicker + h2 + intro) */
export const revealHead = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.6, ease: EASE },
}

/** Carte n° i d'une même section : décalage en cascade de 0,08 s */
export function revealItem(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }
}
