'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { revealHead, revealItem } from '@/lib/motion'
import { formuleSlug, type Formule } from '@/lib/formules'
import { PLANS, MAINTENANCE, SUR_MESURE } from '@/lib/forfaits'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

function FeatureList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((f) => (
        <li key={f} className="flex items-start gap-3 text-text-dim text-sm">
          <CheckIcon />
          {f}
        </li>
      ))}
    </ul>
  )
}

function CtaLink({ formule, label, primary }: { formule: Formule; label: string; primary?: boolean }) {
  return (
    <Link
      href={`/contact?formule=${formuleSlug(formule)}`}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors ${
        primary ? 'bg-accent text-white hover:bg-accent-bright' : 'border border-line-strong text-text-base hover:border-accent'
      }`}
    >
      {label}
      {/* Plusieurs liens au même texte : on précise la formule pour les lecteurs d'écran */}
      <span className="sr-only"> (formule {formule})</span>
    </Link>
  )
}

export default function Forfaits() {
  return (
    <section id="forfaits" className="tone-tint">
      <div className="wrap">
        <motion.div className="section-head mx-auto text-center" {...revealHead}>
          <span className="kicker justify-center">Forfaits</span>
          <h2>Des prix clairs, <span className="grad-text">sans surprise</span></h2>
          <p className="mx-auto">
            Des prix accessibles, sans abonnement caché. Paiement en deux fois possible : acompte au démarrage, solde à la livraison.
            Délais comptés à partir de la réception de tes contenus.
          </p>
        </motion.div>

        {/* Formules empilées : chacune reprend la précédente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              {...revealItem(i)}
              className={`relative flex flex-col rounded-2xl p-8 bg-surface shadow-soft transition-colors duration-300 ${
                plan.featured ? 'border-2 border-accent' : 'border border-line hover:border-accent/40'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold whitespace-nowrap">
                  Recommandé
                </span>
              )}

              <div className="mb-6">
                <div className="text-text-dim text-sm font-medium mb-2">{plan.name}</div>
                <div className="text-text-muted text-xs">À partir de</div>
                <div className="text-4xl font-bold text-text-base mb-3">{plan.price}</div>
                <div className="text-text-muted text-sm leading-relaxed">{plan.tag}</div>
              </div>

              {plan.includes && (
                <p className="text-text-base text-sm font-semibold mb-3">Tout le {plan.includes}, plus&nbsp;:</p>
              )}
              <FeatureList items={plan.features} className="flex-1 mb-8" />

              <CtaLink formule={plan.name} label="Discuter de ton projet" primary={plan.featured} />
            </motion.article>
          ))}
        </div>

        {/* Après la livraison, et besoins qui dépassent les formules */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 mt-6">
          <motion.article
            {...revealItem(0)}
            className="flex flex-col rounded-2xl border border-line bg-surface p-8 shadow-soft"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="text-text-dim text-sm font-medium mb-2">Maintenance</div>
                <div className="text-4xl font-bold text-text-base">
                  {MAINTENANCE.price}
                  <span className="text-base font-medium text-text-muted">{MAINTENANCE.period}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full border border-pill-green-line bg-pill-green-bg text-pill-green-text text-xs font-semibold">
                {MAINTENANCE.note}
              </span>
            </div>
            <FeatureList items={MAINTENANCE.features} className="flex-1 mb-8" />
            <CtaLink formule="Maintenance" label="Discuter de la maintenance" />
          </motion.article>

          <motion.article
            {...revealItem(1)}
            className="flex flex-col rounded-2xl border border-pill-cyan-line bg-pill-cyan-bg p-8 shadow-soft"
          >
            <div className="mb-6">
              <div className="text-text-dim text-sm font-medium mb-2">Sur-mesure</div>
              <div className="text-4xl font-bold text-text-base">{SUR_MESURE.price}</div>
            </div>
            <FeatureList items={SUR_MESURE.features} className="flex-1 mb-8" />
            <CtaLink formule="Sur-mesure" label="Demander un devis" />
          </motion.article>
        </div>
      </div>
    </section>
  )
}
