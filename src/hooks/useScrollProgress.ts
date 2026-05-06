'use client'

import { useState, useEffect, useCallback } from 'react'

interface ScrollProgress {
  progress: number
  velocity: number
  direction: 'up' | 'down'
  currentSection: number
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [currentSection, setCurrentSection] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [lastTime, setLastTime] = useState(Date.now())

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const currentProgress = window.scrollY / scrollHeight
    const currentTime = Date.now()
    const deltaTime = currentTime - lastTime
    const deltaY = window.scrollY - lastScrollY

    const currentVelocity = Math.abs(deltaY / deltaTime) * 1000
    const newDirection = deltaY >= 0 ? 'down' : 'up'
    const section = Math.floor(currentProgress * 5)

    setProgress(currentProgress)
    setVelocity(currentVelocity)
    setDirection(newDirection)
    setCurrentSection(Math.min(section, 4))
    setLastScrollY(window.scrollY)
    setLastTime(currentTime)
  }, [lastScrollY, lastTime])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { progress, velocity, direction, currentSection }
}
