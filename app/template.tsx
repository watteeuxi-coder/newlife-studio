'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Fondu léger au changement de page. Jamais au premier chargement :
// le titre du hero est l'élément LCP, il doit s'afficher tout de suite.
let firstLoad = true

export default function Template({ children }: { children: React.ReactNode }) {
  const initial = firstLoad ? false : { opacity: 0 }
  useEffect(() => {
    firstLoad = false
  }, [])

  return (
    <motion.main initial={initial} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      {children}
    </motion.main>
  )
}
