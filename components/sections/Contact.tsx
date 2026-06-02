'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { waLink, SITE_CONFIG } from '@/lib/config'

export default function Contact() {
  const [ref, isInView] = useScrollReveal()
  const wa = waLink()

  return (
    <section id="contact">
      <div className="wrap">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-accent/20 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12 text-center shadow-[0_0_80px_rgba(34,211,238,0.07)]"
        >
          <span className="kicker justify-center">Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-base mb-4 leading-tight">
            Prêt à donner une nouvelle vie<br className="hidden sm:block" /> à ton business ?
          </h2>
          <p className="text-text-dim mb-8 max-w-lg mx-auto leading-relaxed">
            Le plus simple : écris-nous directement sur WhatsApp. On répond vite et on parle de ton projet sans engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-void font-semibold text-lg hover:bg-accent-bright transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
              </svg>
              Discuter sur WhatsApp
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 text-text-dim hover:text-text-base transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <rect x={3} y={5} width={18} height={14} rx={2} />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {SITE_CONFIG.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
