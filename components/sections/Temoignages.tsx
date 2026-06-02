// components/sections/Temoignages.tsx
'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TEMOIGNAGES = [
  {
    name: 'Karim B.',
    job: 'Gérant de barbershop',
    stars: 5,
    text: "Site livré en 6 jours, mes clients réservent maintenant en ligne. Retour sur investissement dès le premier mois.",
  },
  {
    name: 'Sofia M.',
    job: 'Coach fitness indépendante',
    stars: 5,
    text: "Le design correspond exactement à mon image. Professionnel, rapide, à l'écoute. Je recommande sans hésiter.",
  },
  {
    name: 'Thomas L.',
    job: 'Agent immobilier',
    stars: 5,
    text: "Le chatbot qualifie mes leads avant même que je décroche le téléphone. Bluffant.",
  },
]

export default function Temoignages() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="temoignages">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Témoignages</span>
          <h2>Ce que disent <span className="grad-text">nos clients</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMOIGNAGES.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 rounded-2xl border border-accent/[0.15] bg-white/[0.04] backdrop-blur-xl p-6 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] transition-all"
            >
              <div className="flex gap-0.5 text-accent text-base leading-none">
                {'★'.repeat(t.stars)}
              </div>
              <p className="text-text-dim text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-text-base text-sm font-semibold">{t.name}</div>
                  <div className="text-text-muted text-xs">{t.job}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
