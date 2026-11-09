'use client'

import { motion } from 'framer-motion'
import { MessagesSquare, PencilRuler, Rocket } from 'lucide-react'
import { revealHead, revealItem } from '@/lib/motion'

const STEPS = [
  {
    n: '01',
    Icon: MessagesSquare,
    title: 'On en parle',
    text: 'Tu m’expliques ton activité sur WhatsApp ou par message. Je te réponds sous 24h avec la formule qui te correspond et son prix.',
  },
  {
    n: '02',
    Icon: PencilRuler,
    title: 'Je construis ton site',
    text: 'Tu verses l’acompte et je m’y mets : design, textes, photos. Pas de logo ni de contenu ? Je t’aide. Tu vois la maquette, et 2 séries de retouches sont incluses.',
  },
  {
    n: '03',
    Icon: Rocket,
    title: 'Ton site est en ligne',
    text: 'Livré en 5 à 10 jours après réception de tes contenus, selon la formule. Tu paies le solde à la livraison, et tu peux partager ton lien sur Insta et TikTok.',
  },
]

export default function Process() {
  return (
    <section id="comment-ca-se-passe" className="tone-base">
      <div className="wrap">
        <motion.div
          className="section-head"
          {...revealHead}
        >
          <span className="kicker">Comment ça se passe</span>
          <h2>De ton premier message <span className="grad-text">à ton site en ligne</span></h2>
        </motion.div>

        <ol className="spot-group grid gap-4 md:grid-cols-3 md:gap-5">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              {...revealItem(i)}
              className="spot overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-soft"
            >
              {/* Grand numéro en filigrane (décoratif : l'ordre est porté par la liste <ol>) */}
              <span
                aria-hidden="true"
                className="absolute -top-3 right-3 -z-[1] select-none font-mono text-[6rem] font-bold leading-none text-accent/[0.07]"
              >
                {s.n}
              </span>
              <span aria-hidden="true" className="mb-4 flex items-center justify-center w-11 h-11 rounded-xl bg-accent text-white">
                <s.Icon className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-text-base text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-text-dim text-sm leading-relaxed">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
