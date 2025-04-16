"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Heart, Sparkles } from 'lucide-react'

interface Insight {
  text: string
  type: 'wisdom' | 'practice' | 'reflection'
  timestamp: number
}

export function AIMindfulnessCoach() {
  const [userState, setUserState] = useState({
    breathingRate: 0,
    focusLevel: 0,
    sessionDuration: 0
  })
  const [insights, setInsights] = useState<Insight[]>([])

  // Simulated AI insights (In real app, connect to OpenAI/Claude API)
  const generateInsight = () => {
    const insightTypes = {
      wisdom: [
        "Notice how your thoughts come and go, like clouds in the sky",
        "Your breath is your anchor to the present moment",
        "Embrace the space between your thoughts"
      ],
      practice: [
        "Try taking three deep breaths now",
        "Gently scan your body from head to toe",
        "Let's practice a moment of gratitude"
      ],
      reflection: [
        "What emotions are present for you right now?",
        "How has your mindfulness journey evolved?",
        "What patterns have you noticed in your practice?"
      ]
    }

    const types = Object.keys(insightTypes) as Array<keyof typeof insightTypes>
    const type = types[Math.floor(Math.random() * types.length)]
    const insights = insightTypes[type]
    const text = insights[Math.floor(Math.random() * insights.length)]

    return { text, type, timestamp: Date.now() }
  }

  // Simulate real-time biometric monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setUserState(prev => ({
        breathingRate: Math.sin(Date.now() / 3000) * 2 + 14, // Simulate breathing rate
        focusLevel: Math.min(100, prev.focusLevel + Math.random() * 5),
        sessionDuration: prev.sessionDuration + 1
      }))

      if (Math.random() > 0.8) { // 20% chance to generate new insight
        setInsights(prev => [...prev.slice(-4), generateInsight()])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed right-6 top-24 w-80 bg-neutral-900/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-neutral-800">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">AI Mindfulness Coach</h3>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="text-sm text-neutral-400">Breathing Rate</div>
          <div className="text-xl font-semibold text-white">
            {Math.round(userState.breathingRate)} bpm
          </div>
        </div>
        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="text-sm text-neutral-400">Focus Level</div>
          <div className="text-xl font-semibold text-white">
            {Math.round(userState.focusLevel)}%
          </div>
        </div>
      </div>

      {/* Real-time Insights */}
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.timestamp}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-neutral-800/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              {insight.type === 'wisdom' && <Sparkles className="w-4 h-4 text-blue-400" />}
              {insight.type === 'practice' && <Heart className="w-4 h-4 text-pink-400" />}
              {insight.type === 'reflection' && <Brain className="w-4 h-4 text-purple-400" />}
              <span className="text-sm font-medium capitalize text-neutral-300">
                {insight.type}
              </span>
            </div>
            <p className="text-sm text-white">{insight.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Session Timer */}
      <div className="mt-4 text-center text-sm text-neutral-400">
        Session Duration: {Math.floor(userState.sessionDuration / 60)}m {userState.sessionDuration % 60}s
      </div>
    </div>
  )
}
