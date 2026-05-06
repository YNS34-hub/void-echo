'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SCENE_CONFIG } from '@/utils/constants'
import { particleVertexShader, particleFragmentShader } from '@/utils/shaders'

interface ParticlesProps {
  mouse: { normalizedX: number; normalizedY: number }
  scrollProgress: number
  scrollVelocity: number
  currentSection: number
}

export default function Particles({
  mouse,
  scrollProgress,
  scrollVelocity,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // 根据滚动进度计算粒子数量
  const particleCount = useMemo(() => {
    const base = SCENE_CONFIG.baseParticleCount
    const max = SCENE_CONFIG.maxParticles
    return Math.floor(base + (max - base) * scrollProgress)
  }, [scrollProgress])

  // 生成粒子属性
  const { positions, scales, randomness } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const randomness = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // 位置
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // 缩放
      scales[i] = Math.random()

      // 随机性
      randomness[i3] = (Math.random() - 0.5) * 2
      randomness[i3 + 1] = (Math.random() - 0.5) * 2
      randomness[i3 + 2] = (Math.random() - 0.5) * 2
    }

    return { positions, scales, randomness }
  }, [particleCount])

  // 着色器材质
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScrollProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 30 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  // 动画更新
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    const material = pointsRef.current.material as THREE.ShaderMaterial

    // 更新 uniform
    material.uniforms.uTime.value = time
    material.uniforms.uScrollProgress.value = scrollProgress
    material.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY)

    // 根据滚动速度调整粒子大小
    material.uniforms.uSize.value = 30 + scrollVelocity * 0.1

    // 整体旋转
    pointsRef.current.rotation.y += 0.001 * (1 + scrollVelocity * 0.01)
    pointsRef.current.rotation.x += 0.0005

    // 滚动时的位移
    pointsRef.current.position.y = -scrollProgress * 3
  })

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          args={[randomness, 3]}
        />
      </bufferGeometry>
    </points>
  )
}
