"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Brain, Smile, Sun } from 'lucide-react'

interface EmotionData {
  emotion: 'peaceful' | 'insightful' | 'joyful' | 'energetic'
  intensity: number // 0 to 1
}

export function EmotionIndicator({ emotion, intensity }: EmotionData) {
  const emotions = {
    peaceful: {
      icon: Heart,
      color: 'text-blue-400',
      label: 'Peaceful'
    },
    insightful: {
      icon: Brain,
      color: 'text-purple-400',
      label: 'Insightful'
    },
    joyful: {
      icon: Smile,
      color: 'text-yellow-400',
      label: 'Joyful'
    },
    energetic: {
      icon: Sun,
      color: 'text-orange-400',
      label: 'Energetic'
    }
  }

  const currentEmotion = emotions[emotion]
  const Icon = currentEmotion.icon

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 backdrop-blur-sm"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon className={`w-4 h-4 ${currentEmotion.color}`} />
      </motion.div>
      <span className={`text-sm font-medium ${currentEmotion.color}`}>
        {currentEmotion.label}
      </span>
      <div className="w-16 h-1 rounded-full bg-neutral-800">
        <motion.div
          className={`h-full rounded-full ${currentEmotion.color.replace('text', 'bg')}`}
          initial={{ width: 0 }}
          animate={{ width: `${intensity * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}
