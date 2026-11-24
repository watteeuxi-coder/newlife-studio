'use client'

import { useEffect, useState } from 'react'

/**
 * Email protégé contre les robots qui aspirent les adresses : le HTML ne contient jamais l'adresse complète
 * (seulement « nom [at] domaine »). Le lien mailto est assemblé dans le navigateur, après le chargement.
 */
export default function ProtectedEmail({ user, domain }: { user: string; domain: string }) {
  // Côté serveur : appeler avec les deux moitiés de l'adresse (split('@')), jamais l'adresse entière
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail(`${user}@${domain}`)
  }, [user, domain])

  if (!email) {
    return (
      <span>
        {user} [at] {domain.replace('.', ' [point] ')}
      </span>
    )
  }
  return <a href={`mailto:${email}`}>{email}</a>
}

