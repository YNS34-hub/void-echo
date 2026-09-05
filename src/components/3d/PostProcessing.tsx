'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PostProcessingProps {
  scrollProgress: number
  scrollVelocity: number
}

export default function PostProcessing({
  scrollProgress,
  scrollVelocity,
}: PostProcessingProps) {
  const fogRef = useRef<THREE.FogExp2 | null>(null)
  const backgroundRef = useRef<THREE.Color | null>(null)

  useFrame(() => {
    if (fogRef.current) {
      fogRef.current.density = 0.05 + scrollProgress * 0.15
    }

    if (backgroundRef.current) {
      const brightness = Math.min(Math.abs(scrollVelocity) * 0.0002, 0.05)
      backgroundRef.current.setRGB(brightness, brightness * 0.5, brightness)
    }
  })

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={[0x000000, 0.1]} />
      <color ref={backgroundRef} attach="background" args={[0, 0, 0]} />
    </>
  )
}
