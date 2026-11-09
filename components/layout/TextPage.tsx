import type { ReactNode } from 'react'

/** Gabarit des pages de texte (à propos, légal) : titre, chapô optionnel, sections h2. */
export function TextPage({ title, intro, children }: { title: string; intro?: string | string[]; children: ReactNode }) {
  return (
    <section className="tone-base">
      <div className="wrap">
        <div className="section-head">
          <h1>{title}</h1>
          {(Array.isArray(intro) ? intro : intro ? [intro] : []).map((p) => (
            <p key={p} className="mb-3 last:mb-0">{p}</p>
          ))}
        </div>
        <div className="max-w-2xl space-y-10">{children}</div>
      </div>
    </section>
  )
}

export function TextBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-text-base text-xl font-semibold mb-3">{title}</h2>
      <div className="space-y-3 text-text-dim leading-relaxed [&_a]:text-accent [&_a:hover]:text-accent-bright">
        {children}
      </div>
    </div>
  )
}
