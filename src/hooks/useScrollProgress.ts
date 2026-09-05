'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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

  const lastScrollYRef = useRef(0)
  const lastTimeRef = useRef(0)

  const handleScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    )
    const currentScrollY = window.scrollY
    const currentProgress = Math.min(Math.max(currentScrollY / scrollHeight, 0), 1)
    const currentTime = performance.now()
    const deltaTime = Math.max(currentTime - lastTimeRef.current, 1)
    const deltaY = currentScrollY - lastScrollYRef.current

    const currentVelocity = Math.min(Math.abs(deltaY / deltaTime) * 1000, 5000)
    const newDirection = deltaY >= 0 ? 'down' : 'up'
    const section = Math.min(Math.floor(currentProgress * 5), 4)

    setProgress(currentProgress)
    setVelocity(currentVelocity)
    setDirection(newDirection)
    setCurrentSection(section)

    lastScrollYRef.current = currentScrollY
    lastTimeRef.current = currentTime
  }, [])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    lastTimeRef.current = performance.now()

    const initialFrame = window.requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(initialFrame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return { progress, velocity, direction, currentSection }
}
