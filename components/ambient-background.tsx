"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface AmbientBackgroundProps {
  mood: 'calm' | 'energetic' | 'focused' | 'relaxed'
  intensity: number // 0 to 1
}

export function AmbientBackground({ mood, intensity }: AmbientBackgroundProps) {
  const colors = {
    calm: ['#2193b0', '#6dd5ed'],
    energetic: ['#ee0979', '#ff6a00'],
    focused: ['#8E2DE2', '#4A00E0'],
    relaxed: ['#00b09b', '#96c93d']
  }

  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }> = []

    const createParticles = () => {
      const particleCount = Math.floor(50 * intensity)
      const [color1, color2] = colors[mood]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * intensity,
          speedY: (Math.random() - 0.5) * intensity,
          color: i % 2 === 0 ? color1 : color2
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mood, intensity])

  return (
    <motion.canvas
      ref={particlesRef}
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
