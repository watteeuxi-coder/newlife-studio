'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { EMAIL_PARTS } from '@/lib/config'

/**
 * Email protégé contre les robots qui aspirent les adresses : le HTML ne contient jamais l'adresse complète
 * (seulement « nom [at] gmail [point] com »). Le lien mailto cliquable est assemblé dans le navigateur, après le chargement.
 * `children` = icône éventuelle, placée avant l'adresse.
 */
export default function ProtectedEmail({ className, children }: { className?: string; children?: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail([EMAIL_PARTS.user, EMAIL_PARTS.domain].join('@'))
  }, [])

  if (!email) {
    return (
      <span className={className}>
        {children}
        {EMAIL_PARTS.user} [at] {EMAIL_PARTS.domain.replace('.', ' [point] ')}
      </span>
    )
  }
  return (
    <a href={`mailto:${email}`} className={className}>
      {children}
      {email}
    </a>
  )
}
