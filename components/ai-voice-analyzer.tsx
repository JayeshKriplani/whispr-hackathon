"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Waveform, Heart, Brain } from 'lucide-react'

interface SentimentData {
  emotion: string
  confidence: number
  keywords: string[]
  mindfulnessScore: number
}

export function AIVoiceAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [sentiment, setSentiment] = useState<SentimentData>({
    emotion: 'peaceful',
    confidence: 0.85,
    keywords: ['presence', 'awareness', 'gentle'],
    mindfulnessScore: 92
  })

  // Simulated real-time voice analysis (In real app, use TensorFlow.js or WebAudio API)
  useEffect(() => {
    const emotions = ['peaceful', 'insightful', 'compassionate', 'grounded']
    const keywords = [
      ['presence', 'awareness', 'gentle'],
      ['clarity', 'wisdom', 'understanding'],
      ['kindness', 'empathy', 'connection'],
      ['stability', 'balance', 'centered']
    ]

    const interval = setInterval(() => {
      const randomEmotion = Math.floor(Math.random() * emotions.length)
      setSentiment(prev => ({
        emotion: emotions[randomEmotion],
        confidence: 0.7 + Math.random() * 0.3,
        keywords: keywords[randomEmotion],
        mindfulnessScore: Math.min(100, prev.mindfulnessScore + (Math.random() * 2 - 1))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed left-6 top-24 w-80 bg-neutral-900/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">AI Voice Analysis</h3>
        </div>
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span className="text-xs text-neutral-400">Live</span>
        </motion.div>
      </div>

      {/* Voice Waveform */}
      <div className="relative h-16 mb-4">
        <motion.div
          className="absolute inset-0 flex items-center justify-around"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-blue-400/50 rounded-full"
              animate={{ height: [10, 20 + Math.random() * 30, 10] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Sentiment Analysis */}
      <div className="space-y-4">
        <div className="bg-neutral-800/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-400">Current Emotion</span>
            <span className="text-sm font-medium text-white capitalize">
              {sentiment.emotion}
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full">
            <motion.div
              className="h-full bg-blue-400 rounded-full"
              animate={{ width: `${sentiment.confidence * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2">
          {sentiment.keywords.map((keyword, i) => (
            <motion.span
              key={keyword}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-2 py-1 text-xs font-medium text-white bg-neutral-800/50 rounded-full"
            >
              {keyword}
            </motion.span>
          ))}
        </div>

        {/* Mindfulness Score */}
        <div className="bg-neutral-800/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-400">Mindfulness Score</span>
            <span className="text-sm font-medium text-green-400">
              {Math.round(sentiment.mindfulnessScore)}%
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full">
            <motion.div
              className="h-full bg-green-400 rounded-full"
              animate={{ width: `${sentiment.mindfulnessScore}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
