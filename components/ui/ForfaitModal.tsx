// components/ui/ForfaitModal.tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/config'

export interface ModalPlan {
  name: string
  price: string
  features: string[]
}

interface Props {
  plan: ModalPlan | null
  onClose: () => void
}

const TIMELINE = [
  { day: 'J1', label: 'Brief' },
  { day: 'J3–5', label: 'Maquette' },
  { day: 'J7–10', label: 'Livraison' },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4 text-accent flex-shrink-0">
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

export default function ForfaitModal({ plan, onClose }: Props) {
  useEffect(() => {
    if (!plan) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [plan, onClose])

  useEffect(() => {
    if (plan) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [plan])

  const waMessage = plan
    ? encodeURIComponent(
        `Bonjour NEWLIFE STUDIO, je suis intéressé par le forfait ${plan.name} à ${plan.price}`
      )
    : ''
  const waHref = `https://wa.me/${SITE_CONFIG.waNumber}?text=${waMessage}`

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-lg rounded-2xl border border-accent/40 bg-white/[0.06] backdrop-blur-xl p-8 overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-accent mb-1">
                  {plan.name}
                </div>
                <div className="text-4xl font-bold text-text-base">{plan.price}</div>
              </div>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-base transition-colors p-1"
                aria-label="Fermer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <div className="text-xs text-text-muted uppercase tracking-wider mb-4">
                Déroulement du projet
              </div>
              <div className="flex items-start">
                {TIMELINE.map((step, i) => (
                  <div key={step.day} className="flex-1 relative">
                    {i < TIMELINE.length - 1 && (
                      <div className="absolute top-3 left-1/2 w-full h-px bg-accent/30" />
                    )}
                    <div className="flex flex-col items-center gap-1.5 relative">
                      <div className="w-6 h-6 rounded-full border-2 border-accent bg-accent/20 flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div className="text-xs font-bold text-accent">{step.day}</div>
                      <div className="text-xs text-text-muted text-center">{step.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-text-dim text-sm">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-accent text-void font-semibold hover:bg-accent-bright transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
              </svg>
              Démarrer avec le forfait {plan.name}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
