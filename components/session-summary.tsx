"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Star, Clock, Users, Lightbulb, Sparkles } from 'lucide-react'

interface SessionInsight {
  type: 'highlight' | 'quote' | 'action'
  content: string
}

interface SessionSummaryProps {
  sessionData: {
    duration: number
    participants: number
    keyTopics: string[]
    insights: SessionInsight[]
    impactScore: number
  }
}

export function SessionSummary({ sessionData }: SessionSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-neutral-900/90 backdrop-blur-md rounded-lg p-6 shadow-xl border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">AI Session Summary</h2>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-800/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-neutral-400">Duration</span>
          </div>
          <span className="text-xl font-semibold text-white">
            {Math.floor(sessionData.duration / 60)}m {sessionData.duration % 60}s
          </span>
        </div>
        <div className="bg-neutral-800/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-sm text-neutral-400">Participants</span>
          </div>
          <span className="text-xl font-semibold text-white">
            {sessionData.participants}
          </span>
        </div>
        <div className="bg-neutral-800/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-neutral-400">Impact Score</span>
          </div>
          <span className="text-xl font-semibold text-white">
            {sessionData.impactScore}/100
          </span>
        </div>
      </div>

      {/* Key Topics */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-neutral-400 mb-3">Key Topics</h3>
        <div className="flex flex-wrap gap-2">
          {sessionData.keyTopics.map((topic, i) => (
            <motion.span
              key={topic}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1 text-sm font-medium text-white bg-neutral-800/50 rounded-full"
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </div>

      {/* AI Generated Insights */}
      <div>
        <h3 className="text-sm font-medium text-neutral-400 mb-3">Key Insights</h3>
        <div className="space-y-3">
          {sessionData.insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-start gap-3 bg-neutral-800/30 rounded-lg p-4"
            >
              {insight.type === 'highlight' && (
                <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5" />
              )}
              {insight.type === 'quote' && (
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5" />
              )}
              {insight.type === 'action' && (
                <Star className="w-5 h-5 text-green-400 mt-0.5" />
              )}
              <div>
                <div className="text-xs font-medium text-neutral-400 mb-1 capitalize">
                  {insight.type}
                </div>
                <p className="text-sm text-white">{insight.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
          Export as PDF
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
          Share Insights
        </button>
      </div>
    </motion.div>
  )
}
