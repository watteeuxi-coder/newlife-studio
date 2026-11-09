'use client'

import { motion } from 'framer-motion'
import { TrendingUp, MessageCircle, MapPin } from 'lucide-react'
import { revealHead, revealItem } from '@/lib/motion'

// Textes fournis par l'utilisateur le 2026-11-09
const REASONS = [
  {
    title: 'Un dev qui parle commerce',
    text: 'Études de commerce et création web : ton site est pensé pour attirer et convaincre tes clients, pas juste pour être joli.',
    Icon: TrendingUp,
  },
  {
    title: 'Comme un pote, pas un prestataire',
    text: 'Tu m’écris sur WhatsApp, je te réponds sous 24h. Pas de standard, pas de jargon : c’est moi qui lis, et c’est moi qui réponds.',
    Icon: MessageCircle,
  },
  {
    title: 'Local, à Rouen',
    text: 'Je travaille avec les pros de Rouen et des alentours. On peut se voir en vrai pour parler de ton projet.',
    Icon: MapPin,
  },
]

export default function PourquoiMoi() {
  return (
    <section id="pourquoi-moi" className="tone-base">
      <div className="wrap">
        <motion.div
          className="section-head"
          {...revealHead}
        >
          <h2>Pourquoi <span className="grad-text">moi</span></h2>
        </motion.div>

        <ul className="spot-group grid gap-4 md:grid-cols-3 md:gap-5">
          {REASONS.map((r, i) => (
            <motion.li
              key={r.title}
              {...revealItem(i)}
              className="spot rounded-2xl border border-line bg-surface p-6 shadow-soft"
            >
              <span className="mb-4 flex items-center justify-center w-11 h-11 rounded-xl border bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text" aria-hidden="true">
                <r.Icon className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-text-base text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-text-dim text-sm leading-relaxed">{r.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
