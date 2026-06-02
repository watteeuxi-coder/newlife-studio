import { useRef, type RefObject } from 'react'
import { useInView } from 'framer-motion'

export function useScrollReveal(margin = '-10% 0px') {
  // Cast needed: useRef(null) gives MutableRefObject<null>, useInView expects RefObject<Element>
  const ref = useRef(null) as unknown as RefObject<HTMLElement>
  const isInView = useInView(ref, { once: true, margin: margin as any })
  return [ref, isInView] as const
}
