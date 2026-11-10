import React, { useEffect, useRef } from 'react'
import { isMobileDevice } from '@utils/webgl'

// Use fewer particles on mobile for better performance
const PARTICLE_COUNT = isMobileDevice() ? 0 : 40

function ParticleField() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  // Don't render anything on mobile — save CPU/battery
  if (PARTICLE_COUNT === 0) return null

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Handle resize
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.08,
      size: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.4 + 0.08,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.004 + 0.001,
      // Color: purple to lavender range
      hue: 250 + Math.random() * 30,
    }))

    let frameSkip = 0
    const draw = () => {
      frameSkip++
      // Only draw every other frame — halves CPU usage for canvas particles
      if (frameSkip % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((p) => {
          // Update
          p.x += p.vx
          p.y += p.vy
          p.opacity += p.opacitySpeed * p.opacityDir
          if (p.opacity >= 0.5 || p.opacity <= 0.04) p.opacityDir *= -1

          // Wrap around edges
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0

          // Draw
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 55%, 68%, ${p.opacity})`
          ctx.fill()
        })
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}

export default ParticleField
