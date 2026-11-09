'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

// Thème clair en validation sur l'accueil uniquement. usePathname est résolu au rendu serveur → pas de flash.
const LIGHT_PATHS = ['/']

export default function ThemeRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return <div data-theme={LIGHT_PATHS.includes(pathname) ? 'light' : 'dark'}>{children}</div>
}
