'use client'

import { motion } from 'framer-motion'
import GlitchText from '@/components/ui/GlitchText'
import EnterButton from '@/components/ui/EnterButton'

interface HeroProps {
  onEnterVoid: () => void
}

export default function Hero({ onEnterVoid }: HeroProps) {
  return (
    <section
      id="section-0"
      className="relative h-screen flex flex-col items-center justify-center z-10"
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* 主标题 */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <GlitchText
          text="VOID//ECHO"
          className="text-7xl md:text-9xl font-bold tracking-wider"
          glitchIntensity={2}
        />

        {/* 副标题 */}
        <motion.p
          className="mt-4 text-xl md:text-2xl font-mono text-neonCyan/70 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          IMMERSE YOURSELF IN THE VOID
        </motion.p>
      </motion.div>

      {/* 装饰元素 */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 border border-neonPurple/30 rotate-45"
        animate={{
          rotate: [45, 90, 45],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-10 w-24 h-24 border border-neonCyan/30 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* 按钮 */}
      <motion.div
        className="relative z-10 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <EnterButton onClick={onEnterVoid} />
      </motion.div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-mono text-white/50 tracking-wider">
            SCROLL TO DESCEND
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-neonPurple to-transparent"
            animate={{
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
