'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ResetButtonProps {
  onClick: () => void
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 外框 */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-glitchRed via-neonPurple to-glitchBlue rounded opacity-75 blur-xs"
        animate={{
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* 按钮主体 */}
      <div className="relative px-8 py-4 bg-black rounded border border-glitchRed/50">
        {/* 故障扫描线 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-glitchRed/20 to-transparent"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{
            duration: 0.5,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        {/* 文字 */}
        <motion.span
          className="relative z-10 text-lg font-mono tracking-widest text-white"
          animate={{
            opacity: isHovered ? [1, 0.7, 1] : 1,
          }}
          transition={{
            duration: 0.2,
            repeat: isHovered ? Infinity : 0,
          }}
        >
          RESET REALITY
        </motion.span>
      </div>
    </motion.button>
  )
}
