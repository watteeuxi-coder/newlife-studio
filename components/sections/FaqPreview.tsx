'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealHead } from '@/lib/motion'
import { HOME_FAQ } from '@/lib/faq'
import { FaqItem } from '@/components/sections/Faq'

/** Accueil : 3 questions (mêmes réponses que /offre), lien vers la FAQ complète.
    Desktop : titre + lien à gauche, questions à droite. */
export default function FaqPreview() {
  return (
    <section id="questions" className="tone-base">
      <div className="wrap lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 lg:items-start">
        <motion.div className="section-head !mb-8 lg:!mb-0" {...revealHead}>
          <span className="kicker">Questions fréquentes</span>
          <h2>Tes questions, <span className="grad-text">mes réponses</span></h2>
          <Link
            href="/offre#faq"
            className="hidden lg:inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors"
          >
            Voir toutes les questions →
          </Link>
        </motion.div>

        <div>
          <div className="space-y-3">
            {HOME_FAQ.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </div>
          {/* Mobile : le lien vient après les questions */}
          <Link
            href="/offre#faq"
            className="lg:hidden inline-flex items-center min-h-[44px] mt-6 text-accent font-semibold hover:text-accent-bright transition-colors"
          >
            Voir toutes les questions →
          </Link>
        </div>
      </div>
    </section>
  )
}
