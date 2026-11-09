import PagePending from '@/components/layout/PagePending'
import { TextPage, TextBlock } from '@/components/layout/TextPage'
import { ABOUT, aboutReady } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'À propos',
  description: 'Qui est derrière NEWLIFE STUDIO.',
  path: '/a-propos',
  noindex: !aboutReady(),
})

// Engagements déjà validés par l'utilisateur (cf. CLAUDE.md)
const COMMITMENTS = [
  'Livré en 5 à 10 jours après réception de tes contenus, selon la formule',
  'Réponse sous 24h',
  'Paiement en 2 fois : acompte au démarrage, solde à la livraison',
  '2 séries de retouches incluses',
  'Rouen et alentours',
]

export default function AProposPage() {
  if (!aboutReady()) return <PagePending title="À propos" />

  return (
    <TextPage title="À propos" intro={ABOUT.intro ?? undefined}>
      <TextBlock title="Qui est derrière NEWLIFE STUDIO">
        {ABOUT.story?.map((p) => <p key={p}>{p}</p>)}
      </TextBlock>
      <TextBlock title="Nos engagements">
        <ul className="space-y-2">
          {COMMITMENTS.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4 mt-1 text-accent shrink-0" aria-hidden="true">
                <path d="m5 13 4 4L19 7" />
              </svg>
              {c}
            </li>
          ))}
        </ul>
      </TextBlock>
    </TextPage>
  )
}
