'use client'

import { useEffect, useMemo, useRef } from 'react'
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

function seededRandom(seed: number) {
  const value = Math.sin(seed * 19.19 + 41.73) * 24634.6345
  return value - Math.floor(value)
}

export default function Particles({
  mouse,
  scrollProgress,
  scrollVelocity,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const particleCount = useMemo(() => {
    const base = SCENE_CONFIG.baseParticleCount
    const max = SCENE_CONFIG.maxParticles
    return Math.floor(base + (max - base) * scrollProgress)
  }, [scrollProgress])

  const { positions, scales, randomness } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const randomness = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (seededRandom(i * 7 + 1) - 0.5) * 10
      positions[i3 + 1] = (seededRandom(i * 7 + 2) - 0.5) * 10
      positions[i3 + 2] = (seededRandom(i * 7 + 3) - 0.5) * 10
      scales[i] = seededRandom(i * 7 + 4)
      randomness[i3] = (seededRandom(i * 7 + 5) - 0.5) * 2
      randomness[i3 + 1] = (seededRandom(i * 7 + 6) - 0.5) * 2
      randomness[i3 + 2] = (seededRandom(i * 7 + 7) - 0.5) * 2
    }

    return { positions, scales, randomness }
  }, [particleCount])

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScrollProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uPixelRatio: { value: 1 },
          uSize: { value: 30 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  useEffect(() => {
    const syncPixelRatio = () => {
      shaderMaterial.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio || 1,
        2
      )
    }

    syncPixelRatio()
    window.addEventListener('resize', syncPixelRatio)

    return () => {
      window.removeEventListener('resize', syncPixelRatio)
      shaderMaterial.dispose()
    }
  }, [shaderMaterial])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    const material = pointsRef.current.material as THREE.ShaderMaterial

    material.uniforms.uTime.value = time
    material.uniforms.uScrollProgress.value = scrollProgress
    material.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY)
    material.uniforms.uSize.value = Math.max(8, 30 + scrollVelocity * 0.1)

    pointsRef.current.rotation.y += 0.001 * (1 + scrollVelocity * 0.01)
    pointsRef.current.rotation.x += 0.0005
    pointsRef.current.position.y = -scrollProgress * 3
  })

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute
          attach="attributes-aRandomness"
          args={[randomness, 3]}
        />
      </bufferGeometry>
    </points>
  )
}
