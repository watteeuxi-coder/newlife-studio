'use client'

import { MotionConfig } from 'framer-motion'

/** prefers-reduced-motion : framer-motion retire les transforms (montées) et garde les fondus. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
