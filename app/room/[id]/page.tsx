"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Mic, MicOff, Volume2, Users, MessageSquare, X, Sparkles } from "lucide-react"
import { SoundscapeSelector } from "@/components/soundscape-selector"

export default function RoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState([70])
  const [participants, setParticipants] = useState(24)
  const [showSummary, setShowSummary] = useState(false)
  const [currentSoundscape, setCurrentSoundscape] = useState("forest")

  // Format the room name from the URL
  const roomName = params.id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const getAvatarSrc = (name: string) => {
    // Convert name to kebab case for file name
    const fileName = name.toLowerCase().replace(/\s+/g, '-')
    // Check if we have a custom avatar for this person
    const customAvatars = ['alex-kim', 'maya-patel']
    if (customAvatars.includes(fileName)) {
      return `/avatars/${fileName}.svg`
    }
    // Fallback to placeholder with initials
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
    return `/placeholder.svg?height=80&width=80&text=${initials}`
  }

  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? (
      <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) : (
      <svg className="h-4 w-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }

  interface Speaker {
    name?: string;
    isSpeaking?: boolean;
    isMe?: boolean;
    empty?: boolean;
    gender?: 'male' | 'female';
  }

  // Mock speakers data
  const speakers: Speaker[] = [
    { name: "Alex Kim", isSpeaking: true, isMe: false, gender: "male" as const },
    { name: "Maya Patel", isSpeaking: false, isMe: false, gender: "female" as const },
    { empty: true },
  ]

  // Mock function to leave room
  const leaveRoom = () => {
    setShowSummary(true)
  }

  // Mock function to close summary and return to home
  const closeSummary = () => {
    router.push("/")
  }

  // Simulate random participant count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) => {
        const change = Math.floor(Math.random() * 3) - 1
        return Math.max(1, prev + change)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      {showSummary ? (
        <div className="container max-w-lg mx-auto px-4 py-12 relative z-10">
          <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-neutral-700 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white">Room Summary</h2>
              <Button variant="ghost" size="icon" onClick={closeSummary}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 text-white/90">{roomName}</h3>
              <div className="flex items-center text-sm text-neutral-400 mb-4">
                <span>1 hour 23 minutes • {participants} participants</span>
              </div>

              <div className="flex -space-x-2 mb-4">
                {speakers
                  .filter((s) => !s.empty)
                  .map((speaker, i) => (
                    <Avatar 
                  key={i} 
                  className="border-2 border-neutral-900 ring-2 ring-neutral-800 hover:ring-blue-500/50 transition-all duration-300"
                >
                      <AvatarImage
                        src={speaker.name ? getAvatarSrc(speaker.name) : ''}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {speaker.name
                          ? speaker.name.split(" ").map((n) => n[0]).join("")
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                  ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Key Insights</h4>
                  <p className="text-sm text-neutral-300 mt-1">
                    The discussion focused on mindfulness practices for daily life, with emphasis on morning routines
                    and brief meditation techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MessageSquare className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-100">Topics Covered</h4>
                  <div className="space-y-2 text-sm text-neutral-300">
                    <ul className="list-disc list-inside">
                      <li>Morning meditation techniques</li>
                      <li>Mindfulness in daily activities</li>
                      <li>Breathing exercises for stress reduction</li>
                      <li>Integrating mindfulness into work routines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={closeSummary}>
              Return to Home
            </Button>
          </Card>
        </div>
      ) : (
        <main className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
          <header className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/")} 
              className="p-2 text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-neutral-500 dark:text-neutral-400" />
              <div className="text-sm text-neutral-400">{participants}</div>
            </div>
          </header>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-white">{roomName}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <Volume2 className="h-4 w-4" />
              <span className="capitalize">{currentSoundscape}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr,300px] gap-8 animate-fade-in delay-150">
            {speakers.map((speaker, i) => (
              <div key={i} className="flex flex-col items-center">
                {speaker.empty ? (
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
                    <Card className="p-6 bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-neutral-700 transition-all duration-300" />
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <div className="relative">
                        <Avatar 
                          className="w-20 h-20 border-2 border-neutral-900 ring-2 ring-neutral-800 hover:ring-blue-500/50 transition-all duration-300"
                        >
                          <AvatarImage
                            src={speaker.name ? getAvatarSrc(speaker.name) : ''}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-neutral-800 text-neutral-200">
                            {speaker.name ? speaker.name.split(" ").map((n) => n[0]).join("") : ""}
                          </AvatarFallback>
                        </Avatar>
                        {speaker.gender && (
                          <div className="absolute -bottom-1 -right-1 rounded-full bg-neutral-900 p-0.5 ring-2 ring-neutral-800">
                            {getGenderIcon(speaker.gender)}
                          </div>
                        )}
                      </div>
                      {speaker.isSpeaking && (
                        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-neutral-800"></span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {speaker.name}
                      {speaker.isMe && " (You)"}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMuted ? "outline" : "default"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button variant="destructive" className="rounded-full px-6" onClick={leaveRoom}>
                Leave Room
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <Volume2 className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <Slider value={volume} max={100} step={1} className="flex-1" onValueChange={setVolume} />
            </div>

            <SoundscapeSelector current={currentSoundscape} onChange={setCurrentSoundscape} />
          </div>
        </main>
      )}
    </div>
  )
}

// Helper component for the empty speaker slot
function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
