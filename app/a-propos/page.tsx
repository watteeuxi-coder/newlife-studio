import PagePending from '@/components/layout/PagePending'
import About from '@/components/sections/About'
import { ABOUT, aboutReady } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'À propos',
  description:
    'Ilan, créateur de sites web pour les commerçants, artisans et indépendants de Rouen et ses alentours.',
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
  if (!aboutReady() || !ABOUT.intro || !ABOUT.sections) return <PagePending title="À propos" />

  // 1re ligne du chapô = grand titre (« Salut, moi c’est Ilan. »), le reste = chapô
  const [greeting, ...intro] = ABOUT.intro

  return (
    <About
      greeting={greeting}
      intro={intro}
      blocks={[...ABOUT.sections, { title: 'Mes engagements', list: COMMITMENTS }]}
    />
  )
}
