import { SITE_CONFIG, waLink } from '@/lib/config'
import { ZONES } from '@/lib/zones'
import { PLANS, MAINTENANCE } from '@/lib/forfaits'
import type { FaqEntry } from '@/lib/faq'

/**
 * Données structurées (JSON-LD) pour Google. Règle du projet : uniquement des infos vraies.
 * Pas d'adresse ni de SIRET tant qu'ils ne sont pas fournis (lib/content.ts) : entreprise « à zone desservie ».
 */

const euros = (price: string) => Number(price.replace(/[^\d]/g, ''))

export function businessJsonLd() {
  const url = SITE_CONFIG.siteUrl
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}/#business`,
    name: 'NEWLIFE STUDIO',
    description:
      'Création de sites web pour les commerçants, artisans et indépendants de Rouen et ses alentours : site vitrine, refonte, référencement et maintenance.',
    url,
    image: `${url}/opengraph-image`,
    email: SITE_CONFIG.email,
    founder: { '@type': 'Person', name: 'Ilan' },
    areaServed: ZONES.map((z) => ({
      '@type': 'City',
      name: z.city,
      address: { '@type': 'PostalAddress', postalCode: z.zip, addressCountry: 'FR' },
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SITE_CONFIG.email,
      url: waLink(),
      availableLanguage: 'French',
    },
    makesOffer: [
      ...PLANS.map((p) => ({
        '@type': 'Offer',
        name: `Forfait ${p.name}`,
        description: p.tag,
        priceSpecification: { '@type': 'PriceSpecification', minPrice: euros(p.price), priceCurrency: 'EUR' },
      })),
      {
        '@type': 'Offer',
        name: 'Maintenance',
        description: 'Hébergement, suivi, sauvegardes, mises à jour et petites modifications. Sans engagement.',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: euros(MAINTENANCE.price),
          priceCurrency: 'EUR',
          unitText: 'mois',
        },
      },
    ],
  }
}

export function faqJsonLd(items: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
