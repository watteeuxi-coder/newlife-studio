// Apparition au scroll, commune à tout le site : fondu + légère montée (opacity et transform uniquement).
// prefers-reduced-motion : <MotionConfig reducedMotion="user"> (layout) retire la montée, garde le fondu.
export const EASE = [0.22, 1, 0.36, 1] as const

// Déclenché un peu AVANT l'entrée à l'écran (+15 % en bas) : une carte déjà visible n'est jamais transparente,
// même si on s'arrête de défiler alors qu'elle n'apparaît qu'en bas de l'écran (ancien réglage -10 % : cartes bloquées à 0).
const VIEWPORT = { once: true, margin: '0px 0px 15% 0px' } as const

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
