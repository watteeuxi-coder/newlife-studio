'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const REASONS = [
  {
    n: '01',
    title: 'Des prix accessibles',
    desc: "Un travail de qualité d'agence, à un tarif de freelance. Pas d'abonnement caché, pas de mauvaise surprise.",
  },
  {
    n: '02',
    title: "Livraison rapide grâce à l'IA",
    desc: "On combine notre savoir-faire et les meilleurs outils d'IA pour livrer ton site en quelques jours, pas en quelques mois.",
  },
  {
    n: '03',
    title: 'Une qualité premium',
    desc: "Design soigné, animations fluides, performance et SEO : chaque détail est pensé pour impressionner tes clients.",
  },
]

export default function Pourquoi() {
  const [headRef, headVisible] = useScrollReveal()
  const [orbRef, orbVisible] = useScrollReveal()

  return (
    <section id="pourquoi">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: arguments */}
          <div className="flex-1">
            <motion.div
              ref={headRef as any}
              className="section-head"
              style={{ marginBottom: 34 }}
              initial={{ opacity: 0, y: 30 }}
              animate={headVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="kicker">Pourquoi nous</span>
              <h2>Le studio nouvelle <span className="grad-text">génération</span></h2>
            </motion.div>

            <div className="space-y-8">
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.n}
                  className="flex gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-accent font-mono text-sm font-bold mt-0.5 w-8 flex-shrink-0">{r.n}</span>
                  <div>
                    <h3 className="text-text-base font-semibold mb-1">{r.title}</h3>
                    <p className="text-text-dim text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: animated orb */}
          <motion.div
            ref={orbRef as any}
            className="flex-shrink-0 relative w-64 h-64"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={orbVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Rings */}
            <span className="absolute inset-0 rounded-full border border-accent/20 animate-orb-spin" />
            <span className="absolute inset-6 rounded-full border border-accent/15 animate-orb-spin-rev" />
            <span className="absolute inset-12 rounded-full border border-accent/10 animate-orb-spin-slow" />
            {/* Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-accent">
                  <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
                </svg>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-accent/5 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
