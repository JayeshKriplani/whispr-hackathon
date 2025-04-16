"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  LineChart, 
  Clock, 
  Sparkles, 
  Waves, 
  Moon, 
  Sun, 
  Users 
} from 'lucide-react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface MeditationSession {
  date: string
  duration: number
  focusScore: number
  calmScore: number
  emotionalState: string
  peakTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
}

interface UserPattern {
  category: string
  value: number
  insight: string
}

export function AIInsightsDashboard() {
  const [sessions, setSessions] = useState<MeditationSession[]>([])
  const [patterns, setPatterns] = useState<UserPattern[]>([])
  const [loading, setLoading] = useState(true)

  // Simulated AI analysis of user patterns
  useEffect(() => {
    // In a real app, this would come from your backend AI service
    const mockSessions: MeditationSession[] = [
      {
        date: '2025-04-10',
        duration: 15,
        focusScore: 85,
        calmScore: 78,
        emotionalState: 'peaceful',
        peakTimeOfDay: 'morning'
      },
      {
        date: '2025-04-11',
        duration: 20,
        focusScore: 92,
        calmScore: 88,
        emotionalState: 'focused',
        peakTimeOfDay: 'morning'
      },
      {
        date: '2025-04-12',
        duration: 10,
        focusScore: 75,
        calmScore: 82,
        emotionalState: 'relaxed',
        peakTimeOfDay: 'evening'
      },
      // More sessions...
    ]

    const mockPatterns: UserPattern[] = [
      {
        category: 'Peak Performance Time',
        value: 85,
        insight: 'You show highest focus levels during morning sessions (6-8 AM)'
      },
      {
        category: 'Session Duration Impact',
        value: 92,
        insight: '20-minute sessions yield your best mindfulness scores'
      },
      {
        category: 'Environmental Influence',
        value: 78,
        insight: 'Nature soundscapes improve your calm scores by 35%'
      },
      {
        category: 'Social Dynamics',
        value: 88,
        insight: 'Group sessions enhance your engagement by 40%'
      }
    ]

    setSessions(mockSessions)
    setPatterns(patterns)
    setLoading(false)
  }, [])

  const getTimeIcon = (time: string) => {
    switch(time) {
      case 'morning': return <Sun className="h-4 w-4 text-yellow-400" />
      case 'afternoon': return <Sun className="h-4 w-4 text-orange-400" />
      case 'evening': return <Moon className="h-4 w-4 text-blue-400" />
      case 'night': return <Moon className="h-4 w-4 text-purple-400" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Brain className="h-5 w-5 text-blue-400" />
        </div>
        <h2 className="text-xl font-medium text-white">AI Insights</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{pattern.category}</h3>
                <Progress value={pattern.value} className="w-20" />
              </div>
              <p className="text-sm text-muted-foreground">{pattern.insight}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="font-medium mb-4">Progress Trends</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sessions}>
              <defs>
                <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="calmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="focusScore"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#focusGradient)"
              />
              <Area
                type="monotone"
                dataKey="calmScore"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#calmGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <h4 className="font-medium">Optimal Duration</h4>
          </div>
          <p className="text-2xl font-light">20 min</p>
          <p className="text-sm text-muted-foreground mt-1">Based on focus scores</p>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-4 w-4 text-purple-400" />
            <h4 className="font-medium">Best Soundscape</h4>
          </div>
          <p className="text-2xl font-light">Nature</p>
          <p className="text-sm text-muted-foreground mt-1">35% better results</p>
        </Card>

        <Card className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-green-400" />
            <h4 className="font-medium">Group Impact</h4>
          </div>
          <p className="text-2xl font-light">+40%</p>
          <p className="text-sm text-muted-foreground mt-1">Engagement boost</p>
        </Card>
      </div>
    </div>
  )
}
