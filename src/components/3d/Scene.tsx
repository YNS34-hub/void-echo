'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Geometries from './Geometries'
import Particles from './Particles'
import PostProcessing from './PostProcessing'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function Scene() {
  const mouse = useMousePosition()
  const { progress, velocity, currentSection } = useScrollProgress()

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />

          <Geometries
            mouse={mouse}
            scrollProgress={progress}
            scrollVelocity={velocity}
            currentSection={currentSection}
          />

          <Particles
            mouse={mouse}
            scrollProgress={progress}
            scrollVelocity={velocity}
            currentSection={currentSection}
          />

          <PostProcessing scrollProgress={progress} scrollVelocity={velocity} />
        </Suspense>
      </Canvas>
    </div>
  )
}
