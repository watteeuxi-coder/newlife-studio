'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const STEPS = [
  {
    n: '01',
    title: 'On en parle',
    text: 'Tu nous expliques ton activité sur WhatsApp ou par message. On te répond sous 24h avec la formule qui te correspond et son prix.',
  },
  {
    n: '02',
    title: 'On construit ton site',
    text: 'Tu verses l’acompte et on s’y met : design, textes, photos. Pas de logo ni de contenu ? On t’aide. Tu vois la maquette, et 2 séries de retouches sont incluses.',
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
    <section id="comment-ca-se-passe">
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

        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Fil qui relie les étapes : vertical sur mobile, horizontal sur desktop */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-accent/30 md:left-0 md:right-0 md:top-[19px] md:bottom-auto md:w-auto md:h-px md:bg-transparent md:bg-[linear-gradient(90deg,rgba(var(--accent-rgb),0.3)_70%,transparent)]"
          />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-14 md:pl-0 md:pt-14"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 w-10 h-10 rounded-full border border-accent/40 bg-void flex items-center justify-center font-mono text-sm font-bold text-accent"
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
