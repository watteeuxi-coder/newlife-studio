'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealHead, revealItem } from '@/lib/motion'
import { INCLUDED } from '@/lib/forfaits'

/** Accueil : ce que toutes les formules contiennent. Une seule carte avec une liste, pas 6 cartes identiques. */
export default function Inclus() {
  return (
    <section id="inclus" className="tone-tint">
      <div className="wrap">
        <motion.div className="section-head section-head--split" {...revealHead}>
          <span className="kicker">Inclus</span>
          <h2>Ce que tu as dans <span className="grad-text">chaque site</span></h2>
          <p>Quelle que soit la formule, ces bases sont toujours là.</p>
        </motion.div>

        <motion.div {...revealItem(0)} className="spot rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-soft">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span
                  className="mt-0.5 flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-accent/10 text-accent"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="w-3.5 h-3.5">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-text-base font-semibold">{item.title}</h3>
                  <p className="text-text-dim text-sm leading-relaxed mt-1">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/offre#forfaits"
            className="inline-flex items-center min-h-[44px] mt-6 text-accent font-semibold hover:text-accent-bright transition-colors"
          >
            Comparer les formules →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
