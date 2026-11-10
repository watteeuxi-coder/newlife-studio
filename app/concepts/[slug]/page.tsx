import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowUpRight } from 'lucide-react'
import ProjectShot from '@/components/ui/ProjectShot'
import { PROJECTS, getProject } from '@/lib/projects'
import { pageMetadata } from '@/lib/seo'

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

  return (
    <>
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
    </>
  )
}
