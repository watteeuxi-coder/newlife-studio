import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowUpRight } from 'lucide-react'
import ProjectShot from '@/components/ui/ProjectShot'
import { PROJECTS, getProject } from '@/lib/projects'
import { pageMetadata } from '@/lib/seo'
import { PLANS, SUR_MESURE } from '@/lib/forfaits'
import { formuleSlug } from '@/lib/formules'
import { METIERS } from '@/lib/metiers'
import { breadcrumbJsonLd } from '@/lib/schema'
import JsonLd from '@/components/layout/JsonLd'

// Une page par démo, générée au build. Rien d'inventé : textes dans lib/projects.ts.
export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug)
  if (!p) return {}
  return pageMetadata({ title: p.seo.title, description: p.seo.description, path: `/concepts/${p.slug}` })
}

const linkClass = 'inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors'

function DemoButton({ url, title }: { url: string; title: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all"
    >
      Tester la démo
      <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
      <span className="sr-only"> {title} (nouvel onglet)</span>
    </a>
  )
}

export default function ConceptPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug)
  if (!p) notFound()
  const others = PROJECTS.filter((o) => o.slug !== p.slug)
  const metier = METIERS.find((m) => m.demo === p.slug)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Concepts', path: '/concepts' },
          { name: p.title, path: `/concepts/${p.slug}` },
        ])}
      />
      {/* En-tête : pas d'animation (h1 = élément LCP) */}
      <section className="tone-base">
        <div className="wrap">
          <Link href="/concepts" className={`${linkClass} text-sm mb-4`}>
            ← Tous les concepts
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full border border-pill-cyan-line bg-pill-cyan-bg px-3 py-1 text-xs font-semibold text-pill-cyan-text">
              Concept
            </span>
            <span className="kicker !mb-0">{p.metier}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-text-base mb-4">{p.title}</h1>
          <p className="text-lg text-text-dim leading-relaxed max-w-xl mb-8">
            Concept de site pour un {p.metier.toLowerCase()}. Une démo pour te montrer ce que je peux construire,
            pas un client.
          </p>
          <DemoButton url={p.url} title={p.title} />

          <div className="mt-10 aspect-[1280/832] rounded-2xl border border-line bg-surface p-3 sm:p-4 shadow-soft">
            <ProjectShot title={p.title} cat={p.cat} image={p.image} bg={p.bg} sizes="(min-width: 1200px) 1100px, 100vw" />
          </div>
        </div>
      </section>

      {/* Besoin / réponse : deux colonnes en desktop */}
      <section className="tone-white">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="kicker">Le problème</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">Le besoin type</h2>
            <p className="text-text-dim leading-relaxed">{p.besoin}</p>
          </div>
          <div>
            <span className="kicker">La démo</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">Ce que j&rsquo;ai construit</h2>
            <ul className="space-y-3">
              {p.built.map((b) => (
                <li key={b} className="flex items-start gap-3 text-text-dim leading-relaxed">
                  <Check className="w-4 h-4 mt-1.5 text-accent shrink-0" strokeWidth={2.4} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="tone-base">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">Captures</span>
            <h2>La démo en images</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {p.shots.map((s) => (
              <figure key={s.src} className="aspect-[1280/832] rounded-2xl border border-line bg-surface p-3 shadow-soft">
                <ProjectShot title={p.title} alt={s.alt} image={s.src} bg={p.bg} sizes="(min-width: 768px) 50vw, 100vw" />
              </figure>
            ))}
          </div>
          <p className="text-text-muted text-sm mt-4">Démo&nbsp;: textes, photos, avis et chiffres sont fictifs.</p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4">
            <DemoButton url={p.url} title={p.title} />
            <nav aria-label="Les autres concepts" className="flex flex-col sm:flex-row gap-x-8">
              {others.map((o) => (
                <Link key={o.slug} href={`/concepts/${o.slug}`} className={linkClass}>
                  Voir le concept {o.title} →
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
      {/* Pour quel pro de Rouen + formule conseillée */}
      <section className="tone-white">
        <div className="wrap grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:items-start">
          <div>
            <span className="kicker">À Rouen</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-base mb-4">{p.local.title}</h2>
            <p className="text-text-dim leading-relaxed">{p.local.text}</p>
            {metier && (
              <Link href={`/${metier.slug}`} className={`${linkClass} mt-4`}>
                Tout savoir&nbsp;: {metier.serviceName.toLowerCase()} à Rouen →
              </Link>
            )}
          </div>
          <div className="rounded-2xl border border-line bg-void p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">Formule conseillée</p>
            <p className="text-text-base font-semibold text-xl">
              {p.formule.name}{' '}
              <span className="text-text-dim font-normal text-base">
                · {p.formule.name === 'Sur-mesure' ? SUR_MESURE.price : `à partir de ${PLANS.find((pl) => pl.name === p.formule.name)?.price}`}
              </span>
            </p>
            <p className="text-text-dim text-sm leading-relaxed mt-3">{p.formule.why}</p>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
              <Link
                href={`/contact?formule=${formuleSlug(p.formule.name)}`}
                className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-full bg-accent text-white font-semibold hover:bg-accent-bright transition-colors"
              >
                Discuter de ton projet<span className="sr-only"> (formule {p.formule.name})</span>
              </Link>
              <Link href="/offre#forfaits" className={linkClass}>
                Comparer les formules →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
