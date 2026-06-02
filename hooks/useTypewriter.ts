'use client'

import { useState, useEffect, useRef } from 'react'

const PHRASES = [
  'On donne une nouvelle vie à ton business.',
  'Des sites qui inspirent confiance.',
  'Pensés pour convertir tes abonnés.',
  'Livrés en quelques jours, pas en mois.',
]

export function useTypewriter(): string {
  const [displayText, setDisplayText] = useState('')
  const state = useRef({ p: 0, i: 0, deleting: false })

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduceMotion) {
      setDisplayText(PHRASES[0])
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>

    function tick() {
      const { p, i, deleting } = state.current
      const phrase = PHRASES[p]
      const nextI = i + (deleting ? -1 : 1)
      state.current.i = nextI
      setDisplayText(phrase.slice(0, nextI))

      let delay = deleting ? 28 : 52

      if (!deleting && nextI === phrase.length) {
        delay = 1700
        state.current.deleting = true
      } else if (deleting && nextI === 0) {
        delay = 350
        state.current.deleting = false
        state.current.p = (p + 1) % PHRASES.length
      }

      timeoutId = setTimeout(tick, delay)
    }

    timeoutId = setTimeout(tick, 700)
    return () => clearTimeout(timeoutId)
  }, [])

  return displayText
}
