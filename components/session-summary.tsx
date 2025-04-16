"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RealTimeAIFeedback } from './real-time-ai-feedback'
import { AIInsightsDashboard } from './ai-insights-dashboard'
import { AIAnalysisService } from '@/lib/ai-analysis'
import { Button } from './ui/button'
import { Share2, Scissors } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FileText, Star, Clock, Users, Lightbulb, Sparkles, Brain } from 'lucide-react'

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

interface Clip {
  id: string;
  startTime: number;
  endTime: number;
  title: string;
  audioUrl: string;
}

interface SessionSummaryProps {
  sessionId?: string
}

export function SessionSummary({ sessionId }: SessionSummaryProps) {
  const [insights, setInsights] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [clips, setClips] = useState<Clip[]>([]);
  const [isRecordingClip, setIsRecordingClip] = useState(false);
  const [clipStartTime, setClipStartTime] = useState<number | null>(null);

  useEffect(() => {
    const analyzeSession = async () => {
      if (!sessionId) return
      setIsAnalyzing(true)
      try {
        // In a real app, fetch session data from your backend
        const mockSessionData = {
          duration: 20,
          focusScore: 85,
          calmScore: 78,
          emotionalState: 'peaceful',
          timeOfDay: 'morning',
          participants: 1,
          soundscape: 'nature',
          breathingRate: [12, 14, 13, 12, 11, 12],
          posture: 'good' as const,
          environmentNoise: 35,
          lightLevel: 60,
          temperature: 22,
          breaks: 1,
          distractions: 2,
          flowStates: [
            { startTime: Date.now() - 1000 * 60 * 15, duration: 10 }
          ]
        }
        
        const sessionInsights = await AIAnalysisService.analyzeUserSessions([mockSessionData])
        setInsights(sessionInsights)
      } catch (error) {
        console.error('Error analyzing session:', error)
      } finally {
        setIsAnalyzing(false)
      }
    }

    analyzeSession()
  }, [sessionId])

  const startClip = () => {
    setIsRecordingClip(true);
    setClipStartTime(Date.now());
  };

  const endClip = () => {
    if (!clipStartTime) return;

    const newClip: Clip = {
      id: Math.random().toString(36).substr(2, 9),
      startTime: clipStartTime,
      endTime: Date.now(),
      title: `Clip from ${new Date(clipStartTime).toLocaleTimeString()}`,
      audioUrl: '', // In real implementation, this would be generated from the session recording
    };

    setClips([...clips, newClip]);
    setIsRecordingClip(false);
    setClipStartTime(null);
  };

  const shareClip = async (clip: Clip) => {
    // In real implementation, this would generate a shareable link
    try {
      await navigator.clipboard.writeText(`https://your-app.com/clips/${clip.id}`);
      alert('Clip link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy clip link:', error);
    }
  };

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
            20m 0s
          </span>
        </div>
        <div className="bg-neutral-800/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-sm text-neutral-400">Participants</span>
          </div>
          <span className="text-xl font-semibold text-white">
            1
          </span>
        </div>
        <div className="bg-neutral-800/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-neutral-400">Impact Score</span>
          </div>
          <span className="text-xl font-semibold text-white">
            85/100
          </span>
        </div>
      </div>

      {/* Real-time AI Feedback */}
      <div className="mt-8 bg-neutral-800/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-400" />
          Real-time Analysis
        </h3>
        <RealTimeAIFeedback />
      </div>

      {/* AI Insights Dashboard */}
      <div className="mt-8 bg-neutral-800/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          Session Analytics
        </h3>
        <AIInsightsDashboard />
      </div>

      {/* AI-Generated Insights */}
      <div className="mt-8 bg-neutral-800/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          AI Insights
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn(
                "p-4 rounded-lg border backdrop-blur-sm",
                insight.impact === 'high' ? "bg-blue-500/10 border-blue-500/20" :
                insight.impact === 'medium' ? "bg-purple-500/10 border-purple-500/20" :
                "bg-green-500/10 border-green-500/20"
              )}>
                <h4 className="font-medium mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                {insight.suggestions && insight.suggestions.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {insight.suggestions.map((suggestion: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Clips Section */}
      <div className="mt-8 bg-neutral-800/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Scissors className="h-5 w-5 text-green-400" />
            Session Clips
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={isRecordingClip ? endClip : startClip}
            className={cn(
              "text-xs",
              isRecordingClip && "bg-red-500 hover:bg-red-600 text-white"
            )}
          >
            <Scissors className="h-3 w-3 mr-1" />
            {isRecordingClip ? "Stop Recording" : "Record Clip"}
          </Button>
        </div>

        <div className="space-y-3">
          {clips.map((clip, i) => (
            <div
              key={i}
              className="bg-neutral-900/50 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm"
            >
              <div>
                <span className="text-sm font-medium">
                  Clip {i + 1} - {Math.floor(clip.endTime - clip.startTime) / 1000}s
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => shareClip(clip)}>
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Key Topics */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-neutral-400 mb-3">Key Topics</h3>
        <div className="flex flex-wrap gap-2">
          {['topic1', 'topic2', 'topic3'].map((topic, i) => (
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
        <div className="space-y-8">
          {insights.map((insight, i) => (
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
