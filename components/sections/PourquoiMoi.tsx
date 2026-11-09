'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Textes fournis par l'utilisateur le 2026-11-09
const REASONS = [
  {
    title: 'Un dev qui parle commerce',
    text: 'Études de commerce et création web : ton site est pensé pour attirer et convaincre tes clients, pas juste pour être joli.',
    // Vitrine
    icon: 'M3 9l1.5-5h15L21 9M3 9h18M3 9v11h18V9M9 20v-6h6v6',
  },
  {
    title: 'Comme un pote, pas un prestataire',
    text: 'Tu m’écris sur WhatsApp, je te réponds sous 24h. Pas de standard, pas de jargon : c’est moi qui lis, et c’est moi qui réponds.',
    // Bulle de discussion
    icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12Z',
  },
  {
    title: 'Local, à Rouen',
    text: 'Je travaille avec les pros de Rouen et des alentours. On peut se voir en vrai pour parler de ton projet.',
    // Repère
    icon: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
]

export default function PourquoiMoi() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="pourquoi-moi" className="tone-base">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Pourquoi <span className="grad-text">moi</span></h2>
        </motion.div>

        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {REASONS.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-line bg-surface p-6 shadow-soft"
            >
              <span className="mb-4 flex items-center justify-center w-10 h-10 rounded-full border border-accent/30 bg-accent/5 text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d={r.icon} />
                </svg>
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
