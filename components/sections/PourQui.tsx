'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const PROFILES = [
  {
    who: 'Commerçants',
    examples: 'Boutique, barbershop, restaurant…',
    text: 'Tes horaires, ton adresse, ta carte ou tes produits, et un bouton pour réserver ou t’appeler. Ce qu’un client cherche avant de passer ta porte.',
  },
  {
    who: 'Artisans',
    examples: null,
    text: 'Tes réalisations en photos, ta zone d’intervention et un formulaire pour te demander un devis. Le client sait ce que tu fais avant de t’appeler.',
  },
  {
    who: 'Coachs',
    examples: null,
    text: 'Un site à mettre dans ta bio Instagram : tes offres, tes tarifs et un moyen simple de réserver ou de te contacter.',
  },
  {
    who: 'Immobilier',
    examples: null,
    text: 'Tes biens, ton secteur et un formulaire qui t’envoie des demandes avec le projet déjà décrit.',
  },
]

export default function PourQui() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="pour-qui">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Pour qui</span>
          <h2>Tu fais tourner ton activité. <span className="grad-text">On s&rsquo;occupe du site.</span></h2>
          <p>
            On travaille avec des indépendants et des petites équipes qui veulent un site clair, rapide sur
            téléphone, et pensé pour que les clients les contactent.
          </p>
        </motion.div>

        {/* Liste éditoriale plutôt que des cartes à icônes */}
        <ul className="border-t border-line">
          {PROFILES.map((p, i) => (
            <motion.li
              key={p.who}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-2 md:grid-cols-[240px_1fr] md:gap-10 py-6 border-b border-line"
            >
              <div>
                <h3 className="text-text-base text-lg font-semibold">{p.who}</h3>
                {p.examples && <p className="text-text-muted text-xs mt-1">{p.examples}</p>}
              </div>
              <p className="text-text-dim leading-relaxed max-w-2xl">{p.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
