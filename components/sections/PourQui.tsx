'use client'

import { motion } from 'framer-motion'
import { Store, Hammer, Dumbbell, House, type LucideIcon } from 'lucide-react'
import { revealHead, revealItem } from '@/lib/motion'

const PROFILES = [
  {
    who: 'Commerçants',
    Icon: Store as LucideIcon,
    tone: 'bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text',
    examples: 'Boutique, barbershop, restaurant…',
    text: 'Tes horaires, ton adresse, ta carte ou tes produits, et un bouton pour réserver ou t’appeler. Ce qu’un client cherche avant de passer ta porte.',
  },
  {
    who: 'Artisans',
    Icon: Hammer as LucideIcon,
    tone: 'bg-pill-green-bg border-pill-green-line text-pill-green-text',
    examples: null,
    text: 'Tes réalisations en photos, ta zone d’intervention et un formulaire pour te demander un devis. Le client sait ce que tu fais avant de t’appeler.',
  },
  {
    who: 'Coachs',
    Icon: Dumbbell as LucideIcon,
    tone: 'bg-pill-amber-bg border-pill-amber-line text-pill-amber-text',
    examples: null,
    text: 'Un site à mettre dans ta bio Instagram : tes offres, tes tarifs et un moyen simple de réserver ou de te contacter.',
  },
  {
    who: 'Immobilier',
    Icon: House as LucideIcon,
    tone: 'bg-pill-rose-bg border-pill-rose-line text-pill-rose-text',
    examples: null,
    text: 'Tes biens, ton secteur et un formulaire qui t’envoie des demandes avec le projet déjà décrit.',
  },
]

export default function PourQui() {
  return (
    <section id="pour-qui" className="tone-tint">
      <div className="wrap">
        <motion.div
          className="section-head section-head--split"
          {...revealHead}
        >
          <span className="kicker">Pour qui</span>
          <h2>Tu fais tourner ton activité. <span className="grad-text">Je m&rsquo;occupe du site.</span></h2>
          <p>
            Je travaille avec des indépendants et des petites équipes qui veulent un site clair, rapide sur
            téléphone, et pensé pour que les clients les contactent.
          </p>
        </motion.div>

        <ul className="spot-group grid gap-4 sm:grid-cols-2">
          {PROFILES.map((p, i) => (
            <motion.li
              key={p.who}
              {...revealItem(i)}
              className="spot rounded-2xl border border-line bg-surface p-6 shadow-soft"
            >
              <span className={`mb-4 flex items-center justify-center w-11 h-11 rounded-xl border ${p.tone}`} aria-hidden="true">
                <p.Icon className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-text-base text-lg font-semibold">{p.who}</h3>
                {p.examples && <p className="text-text-muted text-xs mt-1">{p.examples}</p>}
              </div>
              <p className="text-text-dim leading-relaxed mt-3">{p.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
