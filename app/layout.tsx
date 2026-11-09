import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/config'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: 'NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne',
    template: '%s — NEWLIFE STUDIO',
  },
  description:
    "Studio web freelance propulsé par l'IA. Sites vitrine, e-commerce, refonte. Livraison express 5–10 jours. Dès 299€.",
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
    description:
      "Studio web freelance propulsé par l'IA. Dès 299€, livraison 5–10 jours.",
    url: '/',
    siteName: 'NEWLIFE STUDIO',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEWLIFE STUDIO — Nouvelle vie pour ton business en ligne',
    description:
      "Studio web freelance propulsé par l'IA. Dès 299€, livraison 5–10 jours.",
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
      </body>
    </html>
  )
}
