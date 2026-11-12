import Link from 'next/link'
import { Check, ArrowUpRight } from 'lucide-react'
import ProjectShot from '@/components/ui/ProjectShot'
import JsonLd from '@/components/layout/JsonLd'
import { FaqItem } from '@/components/sections/Faq'
import { getProject } from '@/lib/projects'
import { PLANS, SUR_MESURE } from '@/lib/forfaits'
import { formuleSlug } from '@/lib/formules'
import { ZONES } from '@/lib/zones'
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/schema'
import type { Metier } from '@/lib/metiers'

// Page par métier : composant serveur, sans animation d'entrée (léger sur mobile, h1 = LCP).
// Tons : base → white → base → white → base → white → base, puis le bloc final (tint).

const linkClass = 'inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors'
const primaryClass =
  'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all'

const priceOf = (name: Metier['formule']['name']) =>
  name === 'Sur-mesure' ? SUR_MESURE.price : `à partir de ${PLANS.find((p) => p.name === name)?.price}`

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-8">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-text-dim leading-relaxed">
          <Check className="w-4 h-4 mt-1.5 text-accent shrink-0" strokeWidth={2.4} aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  )
}

export default function MetierPage({ m }: { m: Metier }) {
  const demo = m.demo ? getProject(m.demo) : undefined
  const contactHref = `/contact?formule=${formuleSlug(m.formule.name)}`

  return (
    <>
      <JsonLd data={serviceJsonLd(m)} />
      <JsonLd data={breadcrumbJsonLd([{ name: m.serviceName, path: `/${m.slug}` }])} />

      {/* En-tête : jamais animé (LCP) */}
      <section className="tone-base">
        <div className="wrap max-w-4xl">
          <span className="kicker">{m.kicker}</span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-text-base mb-5">{m.h1}</h1>
          <p className="text-lg text-text-dim leading-relaxed max-w-2xl mb-8">{m.intro}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
            <Link href={contactHref} className={primaryClass}>
              Discuter de ton projet<span className="sr-only"> (formule {m.formule.name})</span>
            </Link>
            <Link href={demo ? `/concepts/${demo.slug}` : '/concepts'} className={linkClass}>
              {demo ? `Voir la démo ${demo.title} →` : 'Voir mes 3 concepts →'}
            </Link>
          </div>
          <p className="text-sm text-text-muted mt-8">
            Rouen et alentours&nbsp;: {ZONES.map((z) => z.city).join(', ')}.
          </p>
        </div>
      </section>

      <section className="tone-white">
        <div className="wrap max-w-3xl">
          <span className="kicker">Le problème</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">{m.probleme.title}</h2>
          <p className="text-text-dim leading-relaxed">{m.probleme.text}</p>
        </div>
      </section>

      <section className="tone-base">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">Ton site</span>
            <h2>{m.contenu.title}</h2>
            {m.contenu.intro && <p>{m.contenu.intro}</p>}
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-soft">
            <CheckList items={m.contenu.items} />
          </div>
        </div>
      </section>

      <section className="tone-white">
        <div className={`wrap ${demo ? 'grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-center' : 'max-w-3xl'}`}>
          <div>
            <span className="kicker">{demo ? 'Démo' : 'Exemples'}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">{m.demoText.title}</h2>
            <p className="text-text-dim leading-relaxed mb-6">{m.demoText.text}</p>
            {demo ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
                <Link href={`/concepts/${demo.slug}`} className={linkClass}>
                  Voir le concept {demo.title} →
                </Link>
                <a href={demo.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-1`}>
                  Tester la démo
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
                  <span className="sr-only"> {demo.title} (nouvel onglet)</span>
                </a>
              </div>
            ) : (
              <Link href="/concepts" className={linkClass}>
                Voir mes 3 concepts →
              </Link>
            )}
          </div>
          {demo && (
            <div className="aspect-[1280/832] rounded-2xl border border-line bg-surface p-3 shadow-soft">
              <ProjectShot title={demo.title} cat={demo.cat} image={demo.image} bg={demo.bg} sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
          )}
          {demo && <p className="text-text-muted text-sm lg:col-span-2 -mt-4 lg:mt-0">Démo&nbsp;: textes, photos, avis et chiffres sont fictifs.</p>}
        </div>
      </section>

      <section className="tone-base">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-start">
          <div>
            <span className="kicker">Formule conseillée</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">
              {m.formule.name}, {priceOf(m.formule.name)}
            </h2>
            <p className="text-text-dim leading-relaxed">{m.formule.why}</p>
            {m.formule.alt && <p className="text-text-dim leading-relaxed mt-4">{m.formule.alt}</p>}
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-soft">
            <p className="text-text-base font-semibold mb-4">Dans toutes les formules</p>
            <ul className="space-y-2 text-text-dim text-sm leading-relaxed">
              <li>Livré en 5 à 10 jours après réception de tes contenus</li>
              <li>2 séries de retouches incluses</li>
              <li>Acompte au démarrage, solde à la livraison</li>
              <li>Réponse sous 24h</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
              <Link href={contactHref} className={primaryClass}>
                Discuter de ton projet<span className="sr-only"> (formule {m.formule.name})</span>
              </Link>
              <Link href="/offre#forfaits" className={linkClass}>
                Comparer les formules →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tone-white">
        <div className="wrap max-w-3xl">
          <span className="kicker">Pour démarrer</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">Ce que tu m&rsquo;envoies</h2>
          <p className="text-text-dim leading-relaxed mb-6">
            Pas tout prêt&nbsp;? Je t&rsquo;aide pour les textes et je te guide pour les photos.
          </p>
          <CheckList items={m.envoi} />
        </div>
      </section>

      <section className="tone-base">
        <div className="wrap max-w-3xl">
          <div className="section-head">
            <span className="kicker">Questions</span>
            <h2>Tes questions, mes réponses</h2>
          </div>
          <div className="space-y-3">
            {m.faq.map((f, i) => (
              <FaqItem key={f.q} item={f} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
