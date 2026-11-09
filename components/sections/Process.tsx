'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const STEPS = [
  {
    n: '01',
    title: 'On en parle',
    text: 'Tu m’expliques ton activité sur WhatsApp ou par message. Je te réponds sous 24h avec la formule qui te correspond et son prix.',
  },
  {
    n: '02',
    title: 'Je construis ton site',
    text: 'Tu verses l’acompte et je m’y mets : design, textes, photos. Pas de logo ni de contenu ? Je t’aide. Tu vois la maquette, et 2 séries de retouches sont incluses.',
  },
  {
    n: '03',
    title: 'Ton site est en ligne',
    text: 'Livré en 5 à 10 jours après réception de tes contenus, selon la formule. Tu paies le solde à la livraison, et tu peux partager ton lien sur Insta et TikTok.',
  },
]

export default function Process() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="comment-ca-se-passe" className="tone-base">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Comment ça se passe</span>
          <h2>De ton premier message <span className="grad-text">à ton site en ligne</span></h2>
        </motion.div>

        <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-line bg-surface p-6 shadow-soft"
            >
              <span
                aria-hidden="true"
                className="mb-4 flex items-center justify-center w-10 h-10 rounded-full border border-accent/30 bg-accent/5 font-mono text-sm font-bold text-accent"
              >
                {s.n}
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
