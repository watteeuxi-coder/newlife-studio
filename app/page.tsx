import Hero from '@/components/sections/Hero'
import PourQui from '@/components/sections/PourQui'
import PourquoiMoi from '@/components/sections/PourquoiMoi'
import ConceptsPreview from '@/components/sections/ConceptsPreview'
import Process from '@/components/sections/Process'
import Inclus from '@/components/sections/Inclus'
import FaqPreview from '@/components/sections/FaqPreview'
import Zones from '@/components/sections/Zones'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Création de site web à Rouen',
  description:
    'Création de site web à Rouen et alentours pour commerçants, artisans et indépendants. Site vitrine dès 299 €, design sur mesure, pensé mobile. Réponse sous 24h.',
  path: '/',
})

// Le bloc final « Discuter de ton projet » vient du layout (commun à toutes les pages)
export default function HomePage() {
  return (
    <>
      <Hero />
      <PourQui />
      <PourquoiMoi />
      <ConceptsPreview />
      <Process />
      <Inclus />
      <FaqPreview />
      <Zones />
    </>
  )
}
