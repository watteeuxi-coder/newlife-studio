import PagePending from '@/components/layout/PagePending'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'À propos',
  description: 'Qui est derrière NEWLIFE STUDIO.',
  path: '/a-propos',
  noindex: true,
})

export default function AProposPage() {
  return <PagePending title="À propos" />
}
