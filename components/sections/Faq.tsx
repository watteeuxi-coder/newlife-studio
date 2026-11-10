'use client'

import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { revealHead, revealItem } from '@/lib/motion'
import { FAQ, type FaqEntry } from '@/lib/faq'

export function FaqItem({ item, index }: { item: FaqEntry; index: number }) {
  const [open, setOpen] = useState(false)
  const uid = useId()
  const panelId = `${uid}-a`

  return (
    <motion.div
      {...revealItem(index)}
      className="spot rounded-xl border border-line bg-surface overflow-hidden shadow-soft"
    >
      <button
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-void transition-colors"
      >
        <span className="text-text-base font-medium text-sm sm:text-base">{item.q}</span>
        <motion.span
          className="flex-shrink-0 w-6 h-6 text-accent"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      {/* Réponse toujours présente dans le HTML (lisible par Google, balisage FAQPage sur /offre),
          masquée (visibility: hidden → hors lecteur d'écran) une fois repliée */}
      <motion.div
        id={panelId}
        initial={false}
        animate={open ? { height: 'auto', opacity: 1, visibility: 'visible' } : { height: 0, opacity: 0, transitionEnd: { visibility: 'hidden' } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-text-dim text-sm leading-relaxed border-t border-line pt-4">
          {item.a}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="tone-base">
      <div className="wrap">
        <motion.div
          className="section-head mx-auto text-center"
          {...revealHead}
        >
          <span className="kicker justify-center">Questions fréquentes</span>
          <h2>Je réponds à <span className="grad-text">tes doutes</span></h2>
        </motion.div>

        <div className="spot-group max-w-3xl mx-auto space-y-3">
          {FAQ.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
