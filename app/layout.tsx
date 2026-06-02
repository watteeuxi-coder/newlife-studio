import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
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
  title: 'NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne',
  description:
    "Studio web freelance propulsé par l'IA. Sites vitrine, e-commerce, refonte. Livraison express 5–10 jours. Dès 299€.",
  openGraph: {
    title: 'NEWLIFE STUDIO',
    description: "Studio web freelance propulsé par l'IA. Dès 299€, livraison 5–10 jours.",
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#05070d',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
