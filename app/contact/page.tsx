import Contact from '@/components/sections/Contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact et devis site web à Rouen',
  description:
    'Un projet de site web à Rouen ou dans les alentours ? Écris-moi sur WhatsApp ou via le formulaire : je te réponds sous 24h, et on peut se voir en vrai.',
  path: '/contact',
})

export default function ContactPage() {
  return <Contact titleAs="h1" />
}
