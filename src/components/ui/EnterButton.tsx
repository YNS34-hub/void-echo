'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface EnterButtonProps {
  onClick: () => void
}

export default function EnterButton({ onClick }: EnterButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.button
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 外框发光 */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-neonPurple via-neonCyan to-neonPurple rounded-lg opacity-75 blur-sm"
        animate={{
          opacity: isHovered ? [0.75, 1, 0.75] : 0.5,
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 按钮主体 */}
      <div className="relative px-12 py-6 bg-black rounded-lg border border-neonPurple/50 overflow-hidden">
        {/* 扫描线效果 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-neonPurple/10 to-transparent"
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* 故障装饰 */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-glitchRed"
          animate={{
            scaleX: isHovered ? [0, 1, 0] : 0,
            originX: [0, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        {/* 文字 */}
        <motion.span
          className="relative z-10 text-2xl font-bold tracking-wider text-white"
          animate={{
            textShadow: isHovered
              ? [
                  '0 0 10px #8B5CF6',
                  '0 0 20px #8B5CF6',
                  '0 0 10px #8B5CF6',
                ]
              : '0 0 5px #8B5CF6',
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          ENTER THE VOID
        </motion.span>

        {/* 装饰条 */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-neonCyan"
          animate={{
            width: isPressed ? '100%' : isHovered ? '80%' : '0%',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  )
}
