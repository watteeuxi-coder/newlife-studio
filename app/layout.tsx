import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/config'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectCta from '@/components/layout/ProjectCta'
import MotionProvider from '@/components/layout/MotionProvider'
import Spotlight from '@/components/layout/Spotlight'
import JsonLd from '@/components/layout/JsonLd'
import { businessJsonLd } from '@/lib/schema'
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

// Valeurs par défaut : chaque page définit son title, sa description et son canonical (pageMetadata, lib/seo.ts)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: 'Création de site web à Rouen — NEWLIFE STUDIO',
    template: '%s — NEWLIFE STUDIO',
  },
  description:
    'Création de site web à Rouen et alentours pour commerçants, artisans et indépendants. Site vitrine dès 299 €, design sur mesure, pensé mobile. Réponse sous 24h.',
  applicationName: 'NEWLIFE STUDIO',
  openGraph: { siteName: 'NEWLIFE STUDIO', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#FAFAF7',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Fiche entreprise pour Google (lib/schema.ts) : infos vraies uniquement, pas d'adresse */}
        <JsonLd data={businessJsonLd()} />
        {/* Thème clair sur tout le site (tokens dans globals.css) */}
        <div data-theme="light">
          <MotionProvider>
            <div className="noise" aria-hidden="true" />

            <Header />
            {/* <main> est dans app/template.tsx (fondu au changement de page) */}
            {children}
            <ProjectCta />
            <Footer />

            {/* Bouton WhatsApp flottant (mobile) */}
            <WhatsAppButton />
            <Spotlight />
          </MotionProvider>
        </div>
      </body>
    </html>
  )
}
