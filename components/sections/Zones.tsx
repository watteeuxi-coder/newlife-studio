'use client'

import { motion } from 'framer-motion'
import { revealHead } from '@/lib/motion'
import { ZONES } from '@/lib/zones'

// Une couleur douce par ville, dans l'ordre (classes complètes pour que Tailwind les génère)
const TONES = [
  'bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text',
  'bg-pill-green-bg border-pill-green-line text-pill-green-text',
  'bg-pill-amber-bg border-pill-amber-line text-pill-amber-text',
  'bg-pill-rose-bg border-pill-rose-line text-pill-rose-text',
  'bg-pill-blue-bg border-pill-blue-line text-pill-blue-text',
  'bg-pill-lime-bg border-pill-lime-line text-pill-lime-text',
]

export default function Zones() {
  return (
    <section id="zones" className="tone-white">
      <div className="wrap">
        <motion.div
          className="section-head"
          {...revealHead}
        >
          <span className="kicker">Zone d&rsquo;intervention</span>
          <h2>Présent à <span className="grad-text">Rouen et ses alentours</span></h2>
          <p>Un développeur web local, que tu peux rencontrer en vrai.</p>
        </motion.div>

        <ul className="flex flex-wrap gap-2.5">
          {ZONES.map((z, i) => (
            <li
              key={z.zip}
              className={`inline-flex items-baseline gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm ${TONES[i % TONES.length]}`}
            >
              <span className="font-semibold">{z.city}</span>
              {/* Pas d'opacité réduite : le texte des pastilles doit garder ≥ 4,5:1 */}
              <span className="font-mono text-xs">{z.zip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
