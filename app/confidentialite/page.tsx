import PagePending from '@/components/layout/PagePending'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Confidentialité',
  description: 'Politique de confidentialité du site NEWLIFE STUDIO.',
  path: '/confidentialite',
  noindex: true,
})

export default function ConfidentialitePage() {
  return <PagePending title="Confidentialité" />
}
