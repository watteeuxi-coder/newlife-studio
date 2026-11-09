import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/config'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectCta from '@/components/layout/ProjectCta'
import ThemeRoot from '@/components/layout/ThemeRoot'
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
    default: 'NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne',
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
  themeColor: '#05070d',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeRoot>
          {/* Fonds fixes (z=0), partagés par toutes les pages */}
          <div className="bg-grid" aria-hidden="true" />
          <div className="noise" aria-hidden="true" />
          <ParticleCanvas />

          <Header />
          <main>{children}</main>
          <ProjectCta />
          <Footer />

          {/* Bouton WhatsApp flottant (mobile) */}
          <WhatsAppButton />
        </ThemeRoot>
      </body>
    </html>
  )
}
