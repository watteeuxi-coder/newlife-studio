'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const FAQ = [
  {
    q: 'Combien de temps pour livrer mon site ?',
    a: 'Entre 5 et 10 jours selon le forfait choisi. Le Starter est livré en 5 jours, le Premium en 10 jours. On te tient informé à chaque étape.',
  },
  {
    q: "Je n'ai ni logo ni contenu, c'est un problème ?",
    a: "Pas du tout. On t'accompagne pour les textes, on peut créer un logo simple et te guider pour les photos. Tu n'as pas besoin d'être expert — c'est notre rôle.",
  },
  {
    q: 'Mon site sera-t-il optimisé pour mobile ?',
    a: "Oui, à 100%. Tous nos sites sont pensés mobile-first : la majorité de tes visiteurs viennent de TikTok et Instagram, donc l'expérience téléphone est notre priorité.",
  },
  {
    q: 'Pourrai-je modifier mon site moi-même ?',
    a: "Oui. On peut te livrer une solution facile à modifier et te former, ou s'en occuper pour toi via le forfait maintenance. À toi de choisir.",
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "Un acompte au démarrage du projet, puis le solde à la livraison une fois que tu es 100% satisfait. Paiement en deux fois possible, sans frais.",
  },
]

function FaqItem({ item, index }: { item: typeof FAQ[number]; index: number }) {
  const [open, setOpen] = useState(false)
  const [ref, isInView] = useScrollReveal()

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border border-white/[0.08] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-text-dim text-sm leading-relaxed border-t border-white/[0.06] pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="faq">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker justify-center">Questions fréquentes</span>
          <h2>On répond à <span className="grad-text">tes doutes</span></h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
