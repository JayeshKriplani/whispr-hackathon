"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lotus, Sparkles, Drop, Feather } from 'lucide-react'

interface MindfulReaction {
  type: 'insight' | 'resonance' | 'gratitude' | 'presence'
  timestamp: number
}

export function MindfulReactions() {
  const [reactions, setReactions] = React.useState<MindfulReaction[]>([])

  const reactionTypes = {
    insight: {
      icon: Sparkles,
      color: 'text-purple-400',
      message: 'Moment of Insight'
    },
    resonance: {
      icon: Lotus,
      color: 'text-pink-400',
      message: 'Deep Resonance'
    },
    gratitude: {
      icon: Drop,
      color: 'text-blue-400',
      message: 'Feeling Grateful'
    },
    presence: {
      icon: Feather,
      color: 'text-green-400',
      message: 'Present Moment'
    }
  }

  const addReaction = (type: MindfulReaction['type']) => {
    const newReaction = {
      type,
      timestamp: Date.now()
    }
    setReactions(prev => [...prev, newReaction])
    
    // Remove reaction after animation
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r !== newReaction))
    }, 2000)
  }

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4">
      {/* Reaction Buttons */}
      <div className="flex gap-2">
        {Object.entries(reactionTypes).map(([type, data]) => {
          const Icon = data.icon
          return (
            <motion.button
              key={type}
              className={`p-2 rounded-full bg-neutral-900/50 backdrop-blur-sm ${data.color} 
                hover:bg-neutral-800 transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addReaction(type as MindfulReaction['type'])}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          )
        })}
      </div>

      {/* Floating Reactions */}
      <AnimatePresence>
        {reactions.map((reaction, i) => {
          const { icon: Icon, color, message } = reactionTypes[reaction.type]
          return (
            <motion.div
              key={reaction.timestamp}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full 
                bg-neutral-900/50 backdrop-blur-sm ${color}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
              animate={{ x: -100, y: -100, opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{message}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
