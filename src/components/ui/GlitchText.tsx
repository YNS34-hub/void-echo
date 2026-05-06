'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
}

export default function GlitchText({
  text,
  className = '',
  glitchIntensity = 1,
}: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  // 随机故障效果
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)

        // 生成故障文字
        const glitched = text
          .split('')
          .map((char) => {
            if (Math.random() > 0.7) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join('')

        setGlitchText(glitched)

        // 恢复
        setTimeout(() => {
          setGlitchText(text)
          setIsGlitching(false)
        }, 50 + Math.random() * 100)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [text])

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      animate={
        isGlitching
          ? {
              x: [0, -2 * glitchIntensity, 3 * glitchIntensity, 0],
              skewX: [0, -2 * glitchIntensity, 5 * glitchIntensity, 0],
            }
          : {}
      }
      transition={{ duration: 0.1 }}
    >
      {/* 主文字 */}
      <span className="relative z-10">{glitchText}</span>

      {/* 故障层 1 */}
      <motion.span
        className="absolute inset-0 text-glitchRed opacity-70"
        animate={{
          x: isGlitching ? [0, -3, 5, 0] : 0,
          opacity: isGlitching ? [0.7, 0.3, 0.7] : 0,
        }}
        aria-hidden
      >
        {glitchText}
      </motion.span>

      {/* 故障层 2 */}
      <motion.span
        className="absolute inset-0 text-glitchBlue opacity-70"
        animate={{
          x: isGlitching ? [0, 3, -5, 0] : 0,
          opacity: isGlitching ? [0.7, 0.3, 0.7] : 0,
        }}
        aria-hidden
      >
        {glitchText}
      </motion.span>

      {/* 发光效果 */}
      <motion.span
        className="absolute inset-0 blur-sm text-neonPurple opacity-50"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.div>
  )
}
