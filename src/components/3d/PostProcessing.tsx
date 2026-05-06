'use client'

import { useRef, useEffect } from 'react'
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
  const glitchRef = useRef<any>(null)

  // 通过 ref 初始化色差偏移
  useEffect(() => {
    if (chromaticRef.current) {
      chromaticRef.current.offset = new THREE.Vector2(0.002, 0.002)
    }
  }, [])

  // 每帧更新效果参数
  useFrame(() => {
    // 色差效果 - 根据滚动速度调整
    if (chromaticRef.current) {
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

      {/* 色差效果 - offset 通过 useEffect 设置，不在 JSX 中传递 */}
      <ChromaticAberration
        ref={chromaticRef}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* 故障效果 - 滚动时触发 */}
      <Glitch
        ref={glitchRef}
        delay={0.5}
        duration={0.15}
        strength={0.3}
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
