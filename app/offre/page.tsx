import Services from '@/components/sections/Services'
import Forfaits from '@/components/sections/Forfaits'
import Faq from '@/components/sections/Faq'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Offre & tarifs',
  description:
    'Sites vitrine, e-commerce, refonte, SEO et maintenance. Forfaits dès 299 €, livrés en 5 à 10 jours, paiement en 2 fois.',
  path: '/offre',
})

export default function OffrePage() {
  return (
    <>
      <Services titleAs="h1" />
      <Forfaits />
      <Faq />
    </>
  )
}
