'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from '@/components/3d/Scene'
import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/sections/Hero'
import ScrollSection from '@/components/sections/ScrollSection'
import ResetButton from '@/components/ui/ResetButton'

// 章节内容配置
const sections = [
  {
    id: 'section-1',
    title: 'DISTORTION',
    subtitle: 'REALITY UNRAVELS',
    description:
      'As you descend into the void, the boundaries between digital and physical begin to dissolve. Every pixel trembles with unstable energy, ready to fragment at the slightest touch.',
    theme: 'purple' as const,
  },
  {
    id: 'section-2',
    title: 'FRAGMENT',
    subtitle: 'CONSCIOUSNESS SPLITS',
    description:
      'Your perception fractures into a thousand parallel streams. Each fragment carries a different version of reality, all competing for dominance in the quantum foam of your mind.',
    theme: 'cyan' as const,
  },
  {
    id: 'section-3',
    title: 'CORRUPTION',
    subtitle: 'DATA DECAYS',
    description:
      'The signal corrupts. What was once pure information becomes noise, and in that noise, new patterns emerge. Embrace the chaos - it is the only constant in the void.',
    theme: 'red' as const,
  },
  {
    id: 'section-4',
    title: 'TRANSCEND',
    subtitle: 'BEYOND THE VOID',
    description:
      'You have passed through the layers of reality. Now you stand at the threshold of something greater - a place where code and consciousness merge into infinite possibility.',
    theme: 'mixed' as const,
  },
]

export default function Home() {
  const [isVoidMode, setIsVoidMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // 初始化
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // 进入疯狂模式
  const handleEnterVoid = useCallback(() => {
    setIsVoidMode(true)
  }, [])

  // 重置现实
  const handleResetReality = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      setIsVoidMode(false)
    }, 1000)
  }, [])

  // 点击爆炸效果
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isVoidMode) return

      const explosion = document.createElement('div')
      explosion.className = 'fixed pointer-events-none z-[100]'
      explosion.style.left = `${e.clientX}px`
      explosion.style.top = `${e.clientY}px`

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 rounded-full'
        particle.style.background = i % 2 === 0 ? '#8B5CF6' : '#06B6D4'
        particle.style.transform = `rotate(${i * 30}deg) translateX(0px)`
        particle.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        explosion.appendChild(particle)
      }

      document.body.appendChild(explosion)

      requestAnimationFrame(() => {
        explosion.querySelectorAll('div').forEach((p) => {
          p.style.transform = `rotate(${Math.random() * 360}deg) translateX(${100 + Math.random() * 100}px)`
          p.style.opacity = '0'
        })
      })

      setTimeout(() => explosion.remove(), 600)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [isVoidMode])

  return (
    <main className="relative bg-black min-h-screen noise-bg">
      {/* 3D 场景 */}
      <Scene />

      {/* 导航 */}
      <Navigation />

      {/* 内容层 */}
      <div className="relative z-10">
        {/* Hero 区域 */}
        <Hero onEnterVoid={handleEnterVoid} />

        {/* 滚动章节 */}
        {sections.map((section, index) => (
          <ScrollSection
            key={section.id}
            id={section.id}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            theme={section.theme}
            index={index}
          />
        ))}

        {/* 底部重置区域 */}
        <section className="relative h-screen flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              animate={{
                textShadow: [
                  '0 0 10px #8B5CF6',
                  '0 0 20px #06B6D4',
                  '0 0 10px #8B5CF6',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              END OF LINE
            </motion.h2>

            <motion.p
              className="text-lg text-white/50 mb-12 font-mono"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              THE VOID AWAITS YOUR RETURN
            </motion.p>

            <ResetButton onClick={handleResetReality} />
          </motion.div>

          {/* 底部装饰 */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-neonPurple to-transparent" />
          </motion.div>
        </section>
      </div>

      {/* 全局效果层 */}
      <AnimatePresence>
        {isVoidMode && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 扫描线 */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 加载动画 */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl font-bold tracking-wider text-neonPurple"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.95, 1.02, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              VOID//ECHO
            </motion.div>

            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neonPurple rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            <motion.span
              className="text-sm font-mono text-white/30 tracking-widest"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              INITIALIZING
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
