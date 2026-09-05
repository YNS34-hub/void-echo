'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface PostProcessingProps {
  scrollProgress: number
  scrollVelocity: number
}

export default function PostProcessing({
  scrollProgress,
  scrollVelocity,
}: PostProcessingProps) {
  const { scene } = useThree()
  const fogRef = useRef<THREE.FogExp2 | null>(null)

  useEffect(() => {
    const fog = new THREE.FogExp2(0x000000, 0.1)
    fogRef.current = fog
    scene.fog = fog

    return () => {
      if (scene.fog === fog) scene.fog = null
      fogRef.current = null
    }
  }, [scene])

  useFrame(() => {
    if (fogRef.current) {
      fogRef.current.density = 0.05 + scrollProgress * 0.15
    }

    if (scene.background instanceof THREE.Color) {
      const brightness = Math.min(Math.abs(scrollVelocity) * 0.0002, 0.05)
      scene.background.setRGB(brightness, brightness * 0.5, brightness)
    }
  })

  return null
}
