'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SCENE_CONFIG } from '@/utils/constants'
import {
  geometryVertexShader,
  geometryFragmentShader,
} from '@/utils/shaders'

interface GeometriesProps {
  mouse: { normalizedX: number; normalizedY: number }
  scrollProgress: number
  scrollVelocity: number
  currentSection: number
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

const GEOMETRY_CONFIGS = Array.from(
  { length: SCENE_CONFIG.geometryCount },
  (_, i) => {
    const angle = (i / SCENE_CONFIG.geometryCount) * Math.PI * 2
    const radius = 2 + seededRandom(i * 11 + 1) * 2

    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (seededRandom(i * 11 + 2) - 0.5) * 3,
      ] as [number, number, number],
      rotation: [
        seededRandom(i * 11 + 3) * Math.PI,
        seededRandom(i * 11 + 4) * Math.PI,
        seededRandom(i * 11 + 5) * Math.PI,
      ] as [number, number, number],
      scale: 0.3 + seededRandom(i * 11 + 6) * 0.5,
      geometryType: Math.floor(seededRandom(i * 11 + 7) * 4),
      color: new THREE.Color(
        seededRandom(i * 11 + 8) > 0.5 ? '#8B5CF6' : '#06B6D4'
      ),
      speed: 0.5 + seededRandom(i * 11 + 9) * 1.5,
    }
  }
)

export default function Geometries({
  mouse,
  scrollProgress,
  scrollVelocity,
}: GeometriesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRefs = useRef<THREE.Mesh[]>([])

  const baseMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: geometryVertexShader,
        fragmentShader: geometryFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScrollProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColor: { value: new THREE.Color('#8B5CF6') },
        },
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  )

  const materials = useMemo(
    () => GEOMETRY_CONFIGS.map(() => baseMaterial.clone()),
    [baseMaterial]
  )

  useEffect(
    () => () => {
      materials.forEach((material) => material.dispose())
      baseMaterial.dispose()
    },
    [baseMaterial, materials]
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        SCENE_CONFIG.rotationSpeed * (1 + scrollVelocity * 0.01)
      groupRef.current.rotation.x += SCENE_CONFIG.rotationSpeed * 0.5
      groupRef.current.position.y = -scrollProgress * 5
      groupRef.current.position.z = -scrollProgress * 2
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return

      const config = GEOMETRY_CONFIGS[i]
      const mouseX = mouse.normalizedX * SCENE_CONFIG.mouseInfluence
      const mouseY = mouse.normalizedY * SCENE_CONFIG.mouseInfluence

      mesh.rotation.x += 0.01 * config.speed
      mesh.rotation.y += 0.005 * config.speed

      const breakFactor = scrollProgress * 2
      const originalPos = config.position

      mesh.position.x =
        originalPos[0] + mouseX * 0.5 + Math.sin(time + i) * breakFactor
      mesh.position.y =
        originalPos[1] + mouseY * 0.5 + Math.cos(time + i) * breakFactor
      mesh.position.z =
        originalPos[2] + Math.sin(time * 0.5 + i * 0.5) * breakFactor

      const pulseScale =
        config.scale * (1 + Math.sin(time * 2 + i) * 0.1)
      const velocityScale = 1 + scrollVelocity * 0.001
      mesh.scale.setScalar(pulseScale * velocityScale)

      const material = mesh.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = time
      material.uniforms.uScrollProgress.value = scrollProgress
      material.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY)
      material.uniforms.uColor.value.copy(config.color)
    })
  })

  const getGeometry = (type: number) => {
    switch (type) {
      case 0:
        return <icosahedronGeometry args={[1, 1]} />
      case 1:
        return <octahedronGeometry args={[1, 0]} />
      case 2:
        return <torusGeometry args={[0.7, 0.3, 16, 32]} />
      case 3:
        return <dodecahedronGeometry args={[1, 0]} />
      default:
        return <icosahedronGeometry args={[1, 1]} />
    }
  }

  return (
    <group ref={groupRef}>
      {GEOMETRY_CONFIGS.map((config, i) => (
        <mesh
          key={i}
          ref={(element) => {
            if (element) meshRefs.current[i] = element
          }}
          position={config.position}
          rotation={config.rotation}
          material={materials[i]}
        >
          {getGeometry(config.geometryType)}
        </mesh>
      ))}
    </group>
  )
}
