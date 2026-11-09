import Portfolio from '@/components/sections/Portfolio'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Nos concepts',
  description:
    "Trois sites de démonstration — barbershop, salle de sport, immobilier — pour voir ce qu'on peut construire pour ton activité.",
  path: '/concepts',
})

export default function ConceptsPage() {
  return <Portfolio titleAs="h1" />
}
