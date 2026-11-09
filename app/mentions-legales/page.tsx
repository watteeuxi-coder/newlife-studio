import PagePending from '@/components/layout/PagePending'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site NEWLIFE STUDIO.',
  path: '/mentions-legales',
  noindex: true,
})

export default function MentionsLegalesPage() {
  return <PagePending title="Mentions légales" />
}
