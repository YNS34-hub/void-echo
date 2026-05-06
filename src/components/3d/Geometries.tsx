'use client'

import { useRef, useMemo } from 'react'
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

export default function Geometries({
  mouse,
  scrollProgress,
  scrollVelocity,
  currentSection,
}: GeometriesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRefs = useRef<THREE.Mesh[]>([])

  // 生成几何体配置
  const geometries = useMemo(() => {
    const items = []
    const count = SCENE_CONFIG.geometryCount

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + Math.random() * 2

      items.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 3,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.5,
        geometryType: Math.floor(Math.random() * 4),
        color: new THREE.Color(
          Math.random() > 0.5 ? '#8B5CF6' : '#06B6D4'
        ),
        speed: 0.5 + Math.random() * 1.5,
        randomness: Math.random(),
      })
    }
    return items
  }, [])

  // 着色器材质
  const shaderMaterial = useMemo(
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

  // 动画更新
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      // 整体旋转
      groupRef.current.rotation.y += SCENE_CONFIG.rotationSpeed * (1 + scrollVelocity * 0.01)
      groupRef.current.rotation.x += SCENE_CONFIG.rotationSpeed * 0.5

      // 滚动时的整体位移
      groupRef.current.position.y = -scrollProgress * 5
      groupRef.current.position.z = scrollProgress * -2
    }

    // 更新每个几何体
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return

      const config = geometries[i]

      // 鼠标影响
      const mouseX = mouse.normalizedX * SCENE_CONFIG.mouseInfluence
      const mouseY = mouse.normalizedY * SCENE_CONFIG.mouseInfluence

      // 独立旋转
      mesh.rotation.x += 0.01 * config.speed
      mesh.rotation.y += 0.005 * config.speed

      // 滚动时的破碎效果
      const breakFactor = scrollProgress * 2
      const originalPos = config.position

      mesh.position.x = originalPos[0] + mouseX * 0.5 + Math.sin(time + i) * breakFactor
      mesh.position.y = originalPos[1] + mouseY * 0.5 + Math.cos(time + i) * breakFactor
      mesh.position.z = originalPos[2] + Math.sin(time * 0.5 + i * 0.5) * breakFactor

      // 缩放脉冲
      const pulseScale = config.scale * (1 + Math.sin(time * 2 + i) * 0.1)
      const velocityScale = 1 + scrollVelocity * 0.001
      mesh.scale.setScalar(pulseScale * velocityScale)

      // 更新着色器 uniform
      const material = mesh.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.uTime.value = time
        material.uniforms.uScrollProgress.value = scrollProgress
        material.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY)
        material.uniforms.uColor.value = config.color
      }
    })
  })

  // 生成几何体类型
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
      {geometries.map((config, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el
          }}
          position={config.position}
          rotation={config.rotation}
          material={shaderMaterial.clone()}
        >
          {getGeometry(config.geometryType)}
        </mesh>
      ))}
    </group>
  )
}
