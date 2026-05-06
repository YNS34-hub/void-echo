'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Glitch,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import * as THREE from 'three'

interface PostProcessingProps {
  scrollProgress: number
  scrollVelocity: number
}

export default function PostProcessing({
  scrollProgress,
  scrollVelocity,
}: PostProcessingProps) {
  const chromaticRef = useRef<any>(null)

  useFrame(() => {
    if (chromaticRef.current) {
      // 根据滚动速度调整色差强度
      const intensity = 0.002 + scrollVelocity * 0.0001
      chromaticRef.current.offset.set(intensity, intensity)
    }
  })

  return (
    <EffectComposer>
      {/* 辉光效果 */}
      <Bloom
        intensity={1.5 + scrollProgress}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* 色差效果 */}
      <ChromaticAberration
        ref={chromaticRef}
        offset={new THREE.Vector2(0.002, 0.002)}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* 故障效果 - 滚动时触发 */}
      <Glitch
        delay={new THREE.Vector2(0.5, 1.0)}
        duration={new THREE.Vector2(0.1, 0.3)}
        strength={new THREE.Vector2(0.2, 0.4)}
        mode={GlitchMode.SPORADIC}
        active={scrollVelocity > 50}
        ratio={0.85}
      />

      {/* 噪点 */}
      <Noise
        opacity={0.02 + scrollProgress * 0.05}
        blendFunction={BlendFunction.OVERLAY}
      />

      {/* 暗角 */}
      <Vignette
        eskil={false}
        offset={0.1 + scrollProgress * 0.3}
        darkness={1.0 + scrollProgress}
      />
    </EffectComposer>
  )
}
