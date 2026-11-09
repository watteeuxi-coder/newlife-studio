'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { isLightPath } from '@/lib/theme'

// usePathname est résolu au rendu serveur → le bon thème est dans le HTML, pas de flash.
export default function ThemeRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return <div data-theme={isLightPath(pathname) ? 'light' : 'dark'}>{children}</div>
}
