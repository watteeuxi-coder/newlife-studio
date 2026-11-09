'use client'

import { useEffect } from 'react'

/**
 * Halo cyan qui suit la souris dans les cartes (.spot). Toutes les cartes d'un même .spot-group
 * reçoivent la position, donc la lumière passe d'une carte à l'autre.
 * Uniquement avec une vraie souris et sans prefers-reduced-motion : rien sur mobile.
 */
export default function Spotlight() {
  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!ok.matches) return

    const root = document.documentElement
    root.classList.add('spot-ready')

    let frame = 0
    let x = 0
    let y = 0
    let target: Element | null = null

    const paint = () => {
      frame = 0
      if (!target) return
      const group = target.closest('.spot-group')
      const cards = group ? group.querySelectorAll<HTMLElement>('.spot') : [target.closest<HTMLElement>('.spot')]
      cards.forEach((card) => {
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${x - r.left}px`)
        card.style.setProperty('--my', `${y - r.top}px`)
      })
    }

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      target = e.target instanceof Element ? e.target : null
      if (!frame) frame = requestAnimationFrame(paint)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
      root.classList.remove('spot-ready')
    }
  }, [])

  return null
}
