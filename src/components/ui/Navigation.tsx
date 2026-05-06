'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function Navigation() {
  const { currentSection } = useScrollProgress()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 滚动时隐藏导航
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    { label: 'VOID', section: 0 },
    { label: 'ECHO', section: 1 },
    { label: 'DISTORT', section: 2 },
    { label: 'FRAGMENT', section: 3 },
    { label: 'RESET', section: 4 },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="pointer-events-auto"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl font-mono tracking-wider text-neonPurple">
              V//E
            </span>
          </motion.div>

          {/* 导航项 */}
          <div className="flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                className="relative pointer-events-auto group"
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  const target = document.getElementById(`section-${i}`)
                  target?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {/* 指示器 */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neonCyan"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: currentSection === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* 文字 */}
                <span
                  className={`text-sm font-mono tracking-wider transition-colors duration-300 ${
                    currentSection === i
                      ? 'text-neonCyan'
                      : 'text-white/50 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* 装饰元素 */}
          <motion.div
            className="pointer-events-auto"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="w-2 h-2 bg-glitchRed rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* 故障装饰线 */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-neonPurple/50 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.nav>
  )
}
