'use client'
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as any, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return [count, ref] as const
}
