'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/**
 * Pour ajouter un projet : dépose une capture d'écran (1280×832 conseillé)
 * dans public/images/portfolio/ puis ajoute une entrée ici avec `image`.
 * Sans `image`, la carte affiche un placeholder dégradé avec l'initiale.
 */
const PROJECTS = [
  {
    title: 'Fade & Co. Barbershop',
    cat: 'Barbershop · Réservation en ligne',
    url: 'https://barbershopv2.vercel.app',
    image: '/images/portfolio/barbershop.png',
    bg: 'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.22), transparent 60%), linear-gradient(160deg,#0c1424,#0a0f1c)',
  },
  {
    title: 'Alex Fit',
    cat: 'Salle de sport · Programmes & coaching',
    url: 'https://alex-fit.vercel.app',
    image: '/images/portfolio/alex-fit.png',
    bg: 'radial-gradient(circle at 30% 80%, rgba(94,230,168,0.22), transparent 60%), linear-gradient(160deg,#0a1612,#0a0f1c)',
  },
  {
    title: 'Elite Immo',
    cat: 'Immobilier · Chatbot & génération de leads',
    url: 'https://elite-immo-five.vercel.app',
    image: '/images/portfolio/elite-immo.png',
    bg: 'radial-gradient(circle at 70% 80%, rgba(124,108,255,0.22), transparent 60%), linear-gradient(160deg,#100f1c,#0a0f1c)',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

function ProjectShot({ title, image, bg }: { title: string; image?: string; bg: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/10 h-full flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <div className="relative flex-1 overflow-hidden bg-night">
        {image ? (
          <Image
            src={image}
            alt={`Capture d'écran du site ${title}`}
            fill
            loading="lazy"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: bg }}
          >
            <span className="text-4xl font-bold text-white/15">{title.charAt(0)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="portfolio">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Réalisations</span>
          <h2>Des projets qui <span className="grad-text">donnent envie</span></h2>
          <p>Un aperçu du style NEWLIFE — chaque site est pensé pour l&rsquo;image de marque et la conversion.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-2xl border border-white/[0.08] overflow-hidden hover:border-accent/25 hover:shadow-[0_12px_40px_-16px_rgba(34,211,238,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Screenshot */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visiter ${p.title}`}
                className="relative block h-52 p-5"
                style={{ background: p.bg }}
              >
                <ProjectShot title={p.title} image={p.image} bg={p.bg} />
              </a>
              {/* Meta */}
              <div className="flex items-center justify-between p-5 mt-auto">
                <div>
                  <h3 className="text-text-base font-semibold">{p.title}</h3>
                  <div className="text-text-muted text-xs mt-1">{p.cat}</div>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Voir ${p.title}`}
                  className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                >
                  <ArrowIcon />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
