interface SessionData {
  duration: number
  focusScore: number
  calmScore: number
  emotionalState: string
  timeOfDay: string
  participants: number
  soundscape: string
  breathingRate: number[]
  posture: 'good' | 'poor' | 'neutral'
  environmentNoise: number
  lightLevel: number
  temperature: number
  breaks: number
  distractions: number
  flowStates: { startTime: number; duration: number }[]
}

interface AIInsight {
  type: 'pattern' | 'recommendation' | 'achievement' | 'warning' | 'milestone'
  title: string
  description: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
  category: 'environment' | 'physical' | 'mental' | 'social' | 'progress'
  metadata?: Record<string, any>
  suggestions?: string[]
}

export class AIAnalysisService {
  private static analyzeBreathingPatterns(sessions: SessionData[]): {
    averageRate: number
    consistency: number
    irregularities: number
  } {
    const allRates = sessions.flatMap(s => s.breathingRate)
    const averageRate = allRates.reduce((a, b) => a + b, 0) / allRates.length
    const variance = allRates.reduce((a, b) => a + Math.pow(b - averageRate, 2), 0) / allRates.length
    const consistency = 100 - (Math.sqrt(variance) / averageRate) * 100
    const irregularities = allRates.filter(r => Math.abs(r - averageRate) > 3).length

    return { averageRate, consistency, irregularities }
  }

  private static analyzeEnvironmentalFactors(sessions: SessionData[]): {
    optimalNoise: number
    optimalLight: number
    optimalTemp: number
    environmentalImpact: number
  } {
    const correlations = sessions.map(s => ({
      noise: s.environmentNoise,
      light: s.lightLevel,
      temp: s.temperature,
      score: (s.focusScore + s.calmScore) / 2
    }))

    const optimal = correlations.reduce((best, current) => 
      current.score > best.score ? current : best
    )

    const impact = (correlations.reduce((sum, c) => sum + c.score, 0) / correlations.length) / 
      optimal.score * 100

    return {
      optimalNoise: optimal.noise,
      optimalLight: optimal.light,
      optimalTemp: optimal.temp,
      environmentalImpact: impact
    }
  }

  private static analyzeFlowStates(sessions: SessionData[]): {
    averageFlowDuration: number
    peakFlowTime: string
    flowFrequency: number
  } {
    const allFlows = sessions.flatMap(s => s.flowStates)
    const totalFlowTime = allFlows.reduce((sum, f) => sum + f.duration, 0)
    const averageFlowDuration = totalFlowTime / allFlows.length

    const flowsByHour = allFlows.reduce((acc, flow) => {
      const hour = new Date(flow.startTime).getHours()
      acc[hour] = (acc[hour] || 0) + flow.duration
      return acc
    }, {} as Record<number, number>)

    const peakFlowHour = Object.entries(flowsByHour)
      .reduce((peak, [hour, duration]) => 
        duration > peak.duration ? { hour: Number(hour), duration } : peak
      , { hour: 0, duration: 0 })

    return {
      averageFlowDuration,
      peakFlowTime: `${peakFlowHour.hour}:00`,
      flowFrequency: allFlows.length / sessions.length
    }
  }
  private static calculateOptimalDuration(sessions: SessionData[]): number {
    // Find the duration that correlates with highest focus and calm scores
    const scoredDurations = sessions.map(session => ({
      duration: session.duration,
      avgScore: (session.focusScore + session.calmScore) / 2
    }))

    return scoredDurations.reduce((optimal, current) => {
      return current.avgScore > optimal.avgScore ? current : optimal
    }).duration
  }

  private static analyzeSoundscapeEffectiveness(sessions: SessionData[]): {
    bestSoundscape: string
    improvement: number
  } {
    const soundscapeStats = sessions.reduce((stats, session) => {
      if (!stats[session.soundscape]) {
        stats[session.soundscape] = {
          totalScore: 0,
          count: 0
        }
      }
      stats[session.soundscape].totalScore += (session.focusScore + session.calmScore) / 2
      stats[session.soundscape].count++
      return stats
    }, {} as Record<string, { totalScore: number; count: number }>)

    const averages = Object.entries(soundscapeStats).map(([soundscape, stats]) => ({
      soundscape,
      avgScore: stats.totalScore / stats.count
    }))

    const best = averages.reduce((best, current) => {
      return current.avgScore > best.avgScore ? current : best
    })

    const baseline = averages.reduce((sum, current) => sum + current.avgScore, 0) / averages.length
    const improvement = ((best.avgScore - baseline) / baseline) * 100

    return {
      bestSoundscape: best.soundscape,
      improvement
    }
  }

  private static analyzeTimePatterns(sessions: SessionData[]): {
    optimalTime: string
    consistency: number
  } {
    const timeStats = sessions.reduce((stats, session) => {
      if (!stats[session.timeOfDay]) {
        stats[session.timeOfDay] = {
          totalScore: 0,
          count: 0
        }
      }
      stats[session.timeOfDay].totalScore += (session.focusScore + session.calmScore) / 2
      stats[session.timeOfDay].count++
      return stats
    }, {} as Record<string, { totalScore: number; count: number }>)

    const bestTime = Object.entries(timeStats).reduce((best, [time, stats]) => {
      const avgScore = stats.totalScore / stats.count
      return avgScore > best.avgScore ? { time, avgScore } : best
    }, { time: '', avgScore: 0 })

    const consistency = (timeStats[bestTime.time].count / sessions.length) * 100

    return {
      optimalTime: bestTime.time,
      consistency
    }
  }

  static async analyzeUserSessions(sessions: SessionData[]): Promise<AIInsight[]> {
    const insights: AIInsight[] = []
    
    // Analyze breathing patterns
    const breathingAnalysis = this.analyzeBreathingPatterns(sessions)
    insights.push({
      type: breathingAnalysis.consistency < 70 ? 'warning' : 'achievement',
      title: 'Breathing Pattern Analysis',
      description: `Your breathing consistency is at ${Math.round(breathingAnalysis.consistency)}% with an average rate of ${breathingAnalysis.averageRate.toFixed(1)} breaths per minute`,
      confidence: 0.95,
      impact: breathingAnalysis.irregularities > 10 ? 'high' : 'medium',
      category: 'physical',
      suggestions: [
        'Practice 4-7-8 breathing technique',
        'Set breathing reminders during sessions',
        'Try guided breathing exercises'
      ]
    })

    // Analyze environmental factors
    const envAnalysis = this.analyzeEnvironmentalFactors(sessions)
    insights.push({
      type: 'recommendation',
      title: 'Optimal Environment Settings',
      description: `Your focus peaks in environments with ${envAnalysis.optimalLight}% light, ${envAnalysis.optimalTemp}°C, and ${envAnalysis.optimalNoise}dB ambient noise`,
      confidence: 0.88,
      impact: 'high',
      category: 'environment',
      metadata: { environmentalImpact: envAnalysis.environmentalImpact }
    })

    // Analyze flow states
    const flowAnalysis = this.analyzeFlowStates(sessions)
    insights.push({
      type: 'pattern',
      title: 'Flow State Analysis',
      description: `You achieve flow states most frequently at ${flowAnalysis.peakFlowTime}, lasting an average of ${Math.round(flowAnalysis.averageFlowDuration)} minutes`,
      confidence: 0.92,
      impact: 'high',
      category: 'mental',
      metadata: { flowFrequency: flowAnalysis.flowFrequency }
    })

    // Analyze optimal duration
    const optimalDuration = this.calculateOptimalDuration(sessions)
    insights.push({
      type: 'pattern',
      title: 'Optimal Session Duration',
      description: `Your mindfulness scores peak during ${optimalDuration}-minute sessions`,
      confidence: 0.85,
      impact: 'medium',
      category: 'progress'
    })

    // Analyze soundscape effectiveness
    const soundscapeAnalysis = this.analyzeSoundscapeEffectiveness(sessions)
    insights.push({
      type: 'recommendation',
      title: 'Most Effective Soundscape',
      description: `${soundscapeAnalysis.bestSoundscape} soundscapes improve your scores by ${Math.round(soundscapeAnalysis.improvement)}%`,
      confidence: 0.92,
      impact: 'medium',
      category: 'environment',
      metadata: { improvement: soundscapeAnalysis.improvement }
    })

    // Analyze time patterns
    const timeAnalysis = this.analyzeTimePatterns(sessions)
    insights.push({
      type: 'pattern',
      title: 'Peak Performance Time',
      description: `You achieve best results during ${timeAnalysis.optimalTime} sessions with ${Math.round(timeAnalysis.consistency)}% consistency`,
      confidence: 0.88,
      impact: 'high',
      category: 'mental',
      metadata: { consistency: timeAnalysis.consistency }
    })

    // Analyze emotional patterns
    const emotionalStates = sessions.map(s => s.emotionalState)
    const mostFrequentState = emotionalStates.reduce((a, b) =>
      emotionalStates.filter(v => v === a).length >= emotionalStates.filter(v => v === b).length ? a : b
    )
    insights.push({
      type: 'achievement',
      title: 'Emotional Consistency',
      description: `You most often achieve a "${mostFrequentState}" state during sessions`,
      confidence: 0.82,
      impact: 'medium',
      category: 'mental'
    })

    return insights
  }

  static async generatePersonalizedRecommendations(insights: AIInsight[]): Promise<string[]> {
    // In a real implementation, this would use GPT-4 or another LLM to generate
    // personalized recommendations based on the insights
    return [
      "Try scheduling your sessions during your peak performance time",
      "Experiment with longer durations when using nature soundscapes",
      "Consider joining group sessions to boost engagement",
      "Practice breathing exercises before high-focus sessions"
    ]
  }
}
