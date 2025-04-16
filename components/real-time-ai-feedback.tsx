"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Activity, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'
import { Progress } from './ui/progress'

interface FeedbackMetrics {
  focusLevel: number
  breathingRate: number
  calmness: number
  presence: number
}

interface Suggestion {
  id: string
  message: string
  type: 'breathing' | 'posture' | 'focus' | 'environment'
  priority: 'low' | 'medium' | 'high'
}

export function RealTimeAIFeedback() {
  const [metrics, setMetrics] = useState<FeedbackMetrics>({
    focusLevel: 0,
    breathingRate: 0,
    calmness: 0,
    presence: 0
  })
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  // Simulated real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        focusLevel: Math.min(100, prev.focusLevel + Math.random() * 5),
        breathingRate: 12 + Math.sin(Date.now() / 1000) * 2,
        calmness: Math.min(100, prev.calmness + Math.random() * 3),
        presence: Math.min(100, prev.presence + Math.random() * 4)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // AI suggestions based on metrics
  useEffect(() => {
    const analyzeFeedback = () => {
      const newSuggestions: Suggestion[] = []

      if (metrics.breathingRate > 14) {
        newSuggestions.push({
          id: 'breath-' + Date.now(),
          message: "Try taking slower, deeper breaths",
          type: 'breathing',
          priority: 'high'
        })
      }

      if (metrics.focusLevel < 60) {
        newSuggestions.push({
          id: 'focus-' + Date.now(),
          message: "Gently bring your attention back to your breath",
          type: 'focus',
          priority: 'medium'
        })
      }

      setSuggestions(prev => [...prev.slice(-2), ...newSuggestions])
    }

    const timeout = setTimeout(analyzeFeedback, 3000)
    return () => clearTimeout(timeout)
  }, [metrics])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-blue-400" />
            <h4 className="font-medium">Focus Level</h4>
          </div>
          <Progress value={metrics.focusLevel} className="mb-2" />
          <p className="text-sm text-muted-foreground">{Math.round(metrics.focusLevel)}% focused</p>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-green-400" />
            <h4 className="font-medium">Breathing</h4>
          </div>
          <p className="text-2xl font-light">{metrics.breathingRate.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">breaths per minute</p>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-4 w-4 text-purple-400" />
            <h4 className="font-medium">Calmness</h4>
          </div>
          <Progress value={metrics.calmness} className="mb-2" />
          <p className="text-sm text-muted-foreground">{Math.round(metrics.calmness)}% calm</p>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <h4 className="font-medium">Presence</h4>
          </div>
          <Progress value={metrics.presence} className="mb-2" />
          <p className="text-sm text-muted-foreground">{Math.round(metrics.presence)}% present</p>
        </Card>
      </div>

      <div className="relative h-32">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="absolute bottom-0 left-0 right-0"
              style={{ bottom: `${index * 60}px` }}
            >
              <Card className={cn(
                "p-3 backdrop-blur-sm border-l-4",
                suggestion.priority === 'high' ? "border-l-red-500 bg-red-500/10" :
                suggestion.priority === 'medium' ? "border-l-yellow-500 bg-yellow-500/10" :
                "border-l-blue-500 bg-blue-500/10"
              )}>
                <div className="flex items-center gap-2">
                  {suggestion.type === 'breathing' && <Activity className="h-4 w-4" />}
                  {suggestion.type === 'focus' && <Brain className="h-4 w-4" />}
                  {suggestion.type === 'posture' && <Waves className="h-4 w-4" />}
                  <p className="text-sm">{suggestion.message}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
