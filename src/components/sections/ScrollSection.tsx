'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GlitchText from '@/components/ui/GlitchText'

interface ScrollSectionProps {
  id: string
  title: string
  subtitle: string
  description: string
  theme: 'purple' | 'cyan' | 'red' | 'mixed'
  index: number
}

export default function ScrollSection({
  id,
  title,
  subtitle,
  description,
  theme,
  index,
}: ScrollSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const themeColors = {
    purple: {
      primary: 'text-neonPurple',
      secondary: 'text-neonPurple/50',
      border: 'border-neonPurple/30',
      glow: 'shadow-neonPurple/20',
    },
    cyan: {
      primary: 'text-neonCyan',
      secondary: 'text-neonCyan/50',
      border: 'border-neonCyan/30',
      glow: 'shadow-neonCyan/20',
    },
    red: {
      primary: 'text-glitchRed',
      secondary: 'text-glitchRed/50',
      border: 'border-glitchRed/30',
      glow: 'shadow-glitchRed/20',
    },
    mixed: {
      primary: 'text-neonPurple',
      secondary: 'text-neonCyan/50',
      border: 'border-neonPurple/30',
      glow: 'shadow-neonPurple/20',
    },
  }

  const colors = themeColors[theme]

  return (
    <section
      id={id}
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20"
    >
      {/* 背景装饰 */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b from-transparent ${
          index % 2 === 0 ? 'via-neonPurple/5' : 'via-neonCyan/5'
        } to-transparent`}
        animate={{
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* 故障装饰线 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neonPurple/50 to-transparent"
        animate={{
          opacity: isInView ? [0.3, 0.6, 0.3] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* 内容 */}
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 章节编号 */}
          <motion.span
            className={`text-sm font-mono ${colors.secondary} tracking-widest`}
            animate={{
              opacity: isInView ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            SECTION 0{index + 1}
          </motion.span>

          {/* 副标题 */}
          <motion.h3
            className={`mt-4 text-lg font-mono ${colors.secondary} tracking-wider`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {subtitle}
          </motion.h3>

          {/* 主标题 */}
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlitchText
              text={title}
              className={`text-5xl md:text-7xl font-bold ${colors.primary}`}
              glitchIntensity={1}
            />
          </motion.div>

          {/* 描述 */}
          <motion.p
            className="mt-8 text-lg text-white/70 leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* 装饰元素 */}
          <motion.div
            className={`mt-12 flex items-center gap-4 ${colors.secondary}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div
              className={`w-16 h-px ${colors.border} border-t`}
              animate={{
                scaleX: isInView ? [0, 1] : 0,
              }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            <span className="text-sm font-mono tracking-wider">
              {String(index + 1).padStart(2, '0')} / 05
            </span>
            <motion.div
              className={`w-16 h-px ${colors.border} border-t`}
              animate={{
                scaleX: isInView ? [0, 1] : 0,
              }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 浮动装饰 */}
      <motion.div
        className={`absolute ${
          index % 2 === 0 ? 'right-10' : 'left-10'
        } top-1/2 transform -translate-y-1/2 w-64 h-64 border ${colors.border} rounded-full opacity-20`}
        animate={{
          scale: isInView ? [1, 1.1, 1] : 1,
          rotate: isInView ? [0, 360] : 0,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </section>
  )
}
