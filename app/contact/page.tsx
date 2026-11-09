import Contact from '@/components/sections/Contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Parle-nous de ton projet sur WhatsApp ou par message. Réponse sous 24h.',
  path: '/contact',
})

export default function ContactPage() {
  return <Contact titleAs="h1" />
}
