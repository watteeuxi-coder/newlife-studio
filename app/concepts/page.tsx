import Portfolio from '@/components/sections/Portfolio'
import JsonLd from '@/components/layout/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbJsonLd } from '@/lib/schema'

export const metadata = pageMetadata({
  title: 'Exemples de sites vitrine par métier',
  description:
    'Trois sites de démo pour un barbershop, une salle de sport et une agence immobilière : réservation en ligne, coaching, chatbot. Ce que je peux créer pour toi.',
  path: '/concepts',
})

export default function ConceptsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Concepts', path: '/concepts' }])} />
      <Portfolio titleAs="h1" />
    </>
  )
}
