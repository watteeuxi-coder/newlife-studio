import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/config'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectCta from '@/components/layout/ProjectCta'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const HOME_DESCRIPTION =
  'Création de sites web à Rouen et ses alentours pour commerçants, artisans et indépendants. Sites vitrine, e-commerce, refonte.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: 'NEWLIFE STUDIO — Une nouvelle vie pour ton business en ligne',
    template: '%s — NEWLIFE STUDIO',
  },
  description: HOME_DESCRIPTION,
  keywords: [
    'création site web',
    'site vitrine',
    'freelance web',
    'refonte site',
    'studio web',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'NEWLIFE STUDIO — Nouvelle vie pour ton business en ligne',
    description: HOME_DESCRIPTION,
    url: '/',
    siteName: 'NEWLIFE STUDIO',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEWLIFE STUDIO — Nouvelle vie pour ton business en ligne',
    description: HOME_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#FAFAF7',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Thème clair sur tout le site (tokens dans globals.css) */}
        <div data-theme="light">
          <div className="noise" aria-hidden="true" />

          <Header />
          <main>{children}</main>
          <ProjectCta />
          <Footer />

          {/* Bouton WhatsApp flottant (mobile) */}
          <WhatsAppButton />
        </div>
      </body>
    </html>
  )
}
