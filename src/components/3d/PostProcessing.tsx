'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface PostProcessingProps {
  scrollProgress: number
  scrollVelocity: number
}

// 使用原生 Three.js 实现简单的后期效果
export default function PostProcessing({
  scrollProgress,
  scrollVelocity,
}: PostProcessingProps) {
  const { scene } = useThree()
  const fogRef = useRef<THREE.Fog | null>(null)

  // 初始化雾效果
  if (!fogRef.current && scene) {
    fogRef.current = new THREE.FogExp2(0x000000, 0.1)
    scene.fog = fogRef.current
  }

  useFrame(() => {
    // 根据滚动调整雾的密度
    if (fogRef.current) {
      const fog = fogRef.current as THREE.FogExp2
      fog.density = 0.05 + scrollProgress * 0.15
    }

    // 根据滚动速度调整场景背景亮度
    if (scene.background) {
      const bg = scene.background as THREE.Color
      const brightness = Math.min(scrollVelocity * 0.0002, 0.05)
      bg.setRGB(brightness, brightness * 0.5, brightness)
    }
  })

  // 后期效果现在通过场景属性实现（雾、背景色等）
  return null
}
