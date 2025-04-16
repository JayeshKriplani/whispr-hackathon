"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { RoomCard } from "@/components/room-card"
import { RoomSearch } from "@/components/room-search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Sparkles, Waves, Headphones, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSpring, animated } from "react-spring"

interface Speaker {
  name: string
  gender: 'male' | 'female'
}

interface Room {
  title: string
  participants: number
  speakers: Speaker[]
  soundscape: 'rain' | 'forest' | 'waves' | 'ambient' | 'night'
  isActive: boolean
  startTime?: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const allRooms: Room[] = [
    {
      title: "Morning Meditation Thoughts",
      participants: 24,
      speakers: [
        { name: "Alex Kim", gender: "male" },
        { name: "Maya Patel", gender: "female" }
      ],
      soundscape: "forest",
      isActive: true,
    },
    {
      title: "Mindful Breathing Session",
      participants: 18,
      speakers: [{ name: "Sarah Chen", gender: "female" }],
      soundscape: "waves",
      isActive: true,
    },
    {
      title: "Creative Flow State",
      participants: 15,
      speakers: [
        { name: "David Park", gender: "male" },
        { name: "Emma Wilson", gender: "female" }
      ],
      soundscape: "rain",
      isActive: true,
    },
    {
      title: "Zen Garden Meditation",
      participants: 12,
      speakers: [{ name: "Liam Johnson", gender: "male" }],
      soundscape: "ambient",
      isActive: true,
    }
  ]

  const upcomingRooms: Room[] = [
    {
      title: "Evening Wind Down",
      participants: 0,
      speakers: [
        { name: "Sarah Chen", gender: "female" },
        { name: "Alex Kim", gender: "male" }
      ],
      soundscape: "night",
      isActive: false,
      startTime: "8:00 PM",
    },
    {
      title: "Weekend Reflections",
      participants: 0,
      speakers: [
        { name: "Maya Patel", gender: "female" },
        { name: "Liam Johnson", gender: "male" }
      ],
      soundscape: "forest",
      isActive: false,
      startTime: "9:30 PM",
    }
  ]

  const filteredRooms = allRooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const springProps = useSpring({
    from: { opacity: 0.5, scale: 0.95 },
    to: async (next) => {
      while (true) {
        await next({ opacity: 0.8, scale: 1 })
        await next({ opacity: 0.5, scale: 0.95 })
      }
    },
    config: { duration: 2000 }
  })

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container max-w-5xl mx-auto px-4 py-12 relative">

        <header className="space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-xl animate-glow" />
              <div className="relative flex items-center gap-3">
                <h1 className="text-5xl font-light tracking-tight text-white">whispr</h1>
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <Link href="/create-room">
              <Button 
                variant="default" 
                className="flex items-center gap-2 px-6 py-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
              >
                <PlusCircle className="h-5 w-5" />
                <span className="text-base">Create Space</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search rooms by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50 border-neutral-800 w-full"
            />
          </motion.div>
        </header>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <Waves className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Live Spaces</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(searchQuery ? filteredRooms : allRooms).map((room: Room, index: number) => (
              <RoomCard
                key={index}
                title={room.title}
                participants={room.participants}
                speakers={room.speakers}
                soundscape={room.soundscape}
                isActive={room.isActive}
                startTime={room.startTime}
              />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Moon className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Upcoming Spaces</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingRooms.map((room: Room, index: number) => (
              <RoomCard
                key={index}
                title={room.title}
                participants={room.participants}
                speakers={room.speakers}
                soundscape={room.soundscape}
                isActive={room.isActive}
                startTime={room.startTime}
              />
            ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  )
}
