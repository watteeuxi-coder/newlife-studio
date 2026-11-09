'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import Link from 'next/link'
import { formuleSlug, type Formule } from '@/lib/formules'

const PLANS = [
  {
    name: 'Starter' as Formule,
    price: '299€',
    tag: "Idéal pour lancer ton activité avec une présence pro.",
    features: [
      'Site vitrine 1 page',
      'Design sur mesure',
      '100% responsive mobile',
      'Formulaire de contact',
      'Bouton WhatsApp direct',
      'Livraison en 5 jours',
    ],
    featured: false,
    badge: null as string | null,
    ctaStyle: 'ghost',
  },
  {
    name: 'Pro' as Formule,
    price: '499€',
    tag: "Pour une présence complète qui convertit vraiment.",
    features: [
      "Site jusqu'à 5 pages",
      'Design premium animé',
      'SEO de base inclus',
      'Intégration WhatsApp & réseaux',
      'Formulaire avancé + Google Maps',
      'Livraison en 7 jours',
    ],
    featured: true,
    badge: 'Recommandé' as string | null,
    ctaStyle: 'primary',
  },
  {
    name: 'Premium' as Formule,
    price: '799€',
    tag: "L'expérience complète, taillée pour vendre et durer.",
    features: [
      'Site complet ou e-commerce',
      'Animations cinématiques',
      'SEO avancé & optimisation conversion',
      'Intégrations avancées (CRM, paiement)',
      'Formation incluse',
      'Livraison en 10 jours',
    ],
    featured: false,
    badge: null as string | null,
    ctaStyle: 'ghost',
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4 text-accent flex-shrink-0">
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

export default function Forfaits() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="forfaits" className="tone-tint">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker justify-center">Forfaits</span>
          <h2>Des prix clairs, <span className="grad-text">sans surprise</span></h2>
          <p className="mx-auto">
            Des prix accessibles, sans abonnement caché. Paiement en deux fois possible : acompte au démarrage, solde à la livraison.
            Délais comptés à partir de la réception de tes contenus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-2xl p-8 bg-surface shadow-soft transition-colors duration-300 ${
                plan.featured ? 'border-2 border-accent' : 'border border-line hover:border-accent/40'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <div className="text-text-dim text-sm font-medium mb-2">{plan.name}</div>
                <div className="text-4xl font-bold text-text-base mb-3">{plan.price}</div>
                <div className="text-text-muted text-sm leading-relaxed">{plan.tag}</div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-text-dim text-sm">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?formule=${formuleSlug(plan.name)}`}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors ${
                  plan.ctaStyle === 'primary'
                    ? 'bg-accent text-white hover:bg-accent-bright'
                    : 'border border-line-strong text-text-base hover:border-accent'
                }`}
              >
                Discuter de ton projet
                {/* 3 liens au même texte : on précise la formule pour les lecteurs d'écran */}
                <span className="sr-only"> (formule {plan.name})</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
