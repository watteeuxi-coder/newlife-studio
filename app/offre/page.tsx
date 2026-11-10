import Services from '@/components/sections/Services'
import Forfaits from '@/components/sections/Forfaits'
import Faq from '@/components/sections/Faq'
import JsonLd from '@/components/layout/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { FAQ } from '@/lib/faq'
import { faqJsonLd } from '@/lib/schema'

export const metadata = pageMetadata({
  title: 'Tarifs site vitrine à Rouen, dès 299 €',
  description:
    'Site vitrine ou refonte à Rouen : forfaits dès 299 €, 2 séries de retouches incluses, paiement en deux fois. Boutique en ligne sur devis. Maintenance 30 €/mois.',
  path: '/offre',
})

export default function OffrePage() {
  return (
    <>
      <Services titleAs="h1" />
      <Forfaits />
      <Faq />
      {/* FAQ complète uniquement ici (l'accueil en reprend 3 : pas de doublon de balisage) */}
      <JsonLd data={faqJsonLd(FAQ)} />
    </>
  )
}
