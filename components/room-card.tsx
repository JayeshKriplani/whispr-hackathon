"use client"

import * as React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Users, Volume2, Waves, TreePine, Cloud, Sparkles, Moon } from "lucide-react"
import { motion } from "framer-motion"

interface Speaker {
  name: string
  gender: 'male' | 'female'
}

interface RoomCardProps {
  title: string
  participants: number
  speakers: Speaker[]
  soundscape: "rain" | "forest" | "waves" | "ambient" | "night"
  isActive: boolean
  startTime?: string
}

export function RoomCard({ title, participants, speakers, soundscape, isActive, startTime }: RoomCardProps) {
  const soundscapeIcons = {
    rain: Cloud,
    forest: TreePine,
    waves: Waves,
    ambient: Sparkles,
    night: Moon,
  }

  const soundscapeColors = {
    rain: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    forest: "bg-green-500/10 text-green-400 border-green-500/20",
    waves: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    ambient: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    night: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  }

  const getAvatarSrc = (name: string) => {
    // Convert name to kebab case for file name
    const fileName = name.toLowerCase().replace(/\s+/g, '-')
    // Check if we have a custom avatar for this person
    const customAvatars = [
      'alex-kim',
      'maya-patel',
      'sarah-chen',
      'david-park',
      'emma-wilson',
      'liam-johnson'
    ]
    if (customAvatars.includes(fileName)) {
      return `/avatars/${fileName}.svg`
    }
    // Fallback to placeholder with initials
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
    return `/placeholder.svg?height=40&width=40&text=${initials}`
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

  return (
    <Link href={isActive ? `/room/${title.toLowerCase().replace(/\s+/g, "-")}` : "#"}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="h-full bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-medium text-xl text-white">{title}</h3>
            <Badge variant="outline" className={`${soundscapeColors[soundscape]} border px-3 py-1.5`}>
              {soundscapeIcons[soundscape] && React.createElement(soundscapeIcons[soundscape], { className: "h-4 w-4 mr-2" })}
              {soundscape}
            </Badge>
          </div>

          <div className="flex -space-x-3 mb-4">
            {speakers.map((speaker, i) => (
              <div key={i} className="relative">
                <Avatar 
                  className="border-2 border-neutral-900 ring-2 ring-neutral-800 hover:ring-blue-500/50 transition-all duration-300"
                >
                  <AvatarImage 
                    src={getAvatarSrc(speaker.name)}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-neutral-800 text-neutral-200">
                    {speaker.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 rounded-full bg-neutral-900 p-0.5 ring-2 ring-neutral-800">
                  {getGenderIcon(speaker.gender)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-neutral-500">
            {speakers.length < 3 && (
              <p className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                {3 - speakers.length} speaker slot{3 - speakers.length !== 1 ? "s" : ""} available
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t border-neutral-800/50 pt-4 pb-4">
          {isActive ? (
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-neutral-400" />
              <span className="text-neutral-400">{participants} listening</span>
              <div className="ml-3 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse delay-75"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse delay-150"></div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-neutral-400 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Starting {startTime}
            </div>
          )}
        </CardFooter>
      </Card>
      </motion.div>
    </Link>
  )
}
