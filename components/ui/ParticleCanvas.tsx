'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

const PARTICLE_COUNT = 80
const CONNECTION_DISTANCE = 120
const ACCENT_RGB = '34, 211, 238'

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Désactivé sur petits écrans et si l'utilisateur préfère réduire les animations
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(desktop.matches && !reducedMotion.matches)
    update()
    desktop.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    return () => {
      desktop.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animFrameId = 0
    let running = true
    let w = 0
    let h = 0

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w
      canvas!.height = h
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: 0.3 + Math.random() * 0.4,
      }))
    }

    function draw() {
      if (!running) return
      ctx!.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${ACCENT_RGB}, ${p.opacity})`
        ctx!.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(q.x, q.y)
            ctx!.strokeStyle = `rgba(${ACCENT_RGB}, ${alpha})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      animFrameId = requestAnimationFrame(draw)
    }

    let resizeTimeout: ReturnType<typeof setTimeout>
    function onResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resize()
        init()
      }, 150)
    }

    // Pause l'animation quand l'onglet est en arrière-plan
    function onVisibilityChange() {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(animFrameId)
      } else {
        running = true
        draw()
      }
    }

    resize()
    init()
    draw()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      running = false
      cancelAnimationFrame(animFrameId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
