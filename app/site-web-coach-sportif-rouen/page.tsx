import MetierPage from '@/components/sections/MetierPage'
import { getMetier } from '@/lib/metiers'
import { pageMetadata } from '@/lib/seo'

const m = getMetier('site-web-coach-sportif-rouen')!

export const metadata = pageMetadata({ ...m.seo, path: `/${m.slug}` })

export default function Page() {
  return <MetierPage m={m} />
}
