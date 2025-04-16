"use client"

import React, { useState, useEffect } from 'react'
import { Search, Users, Clock } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface Room {
  id: string
  title: string
  description: string
  participants: number
  category: string
  startTime: string
  isLive: boolean
}

export function RoomSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    'all',
    'meditation',
    'mindfulness',
    'breathing',
    'yoga',
    'discussion'
  ]

  // Simulated rooms data (in real app, fetch from API)
  useEffect(() => {
    const mockRooms: Room[] = [
      {
        id: '1',
        title: 'Morning Meditation',
        description: 'Start your day with mindfulness',
        participants: 12,
        category: 'meditation',
        startTime: '08:00 AM',
        isLive: true
      },
      {
        id: '2',
        title: 'Breathing Workshop',
        description: 'Learn advanced breathing techniques',
        participants: 8,
        category: 'breathing',
        startTime: '10:00 AM',
        isLive: true
      },
      {
        id: '3',
        title: 'Mindful Discussion',
        description: 'Open discussion about mindfulness practices',
        participants: 15,
        category: 'discussion',
        startTime: '02:00 PM',
        isLive: false
      }
    ]
    setRooms(mockRooms)
    setFilteredRooms(mockRooms)
  }, [])

  // Filter rooms based on search query and category
  useEffect(() => {
    const filtered = rooms.filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          room.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredRooms(filtered)
  }, [searchQuery, selectedCategory, rooms])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map(room => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-lg border bg-card p-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{room.title}</h3>
                  {room.isLive && (
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      LIVE
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{room.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {room.participants}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {room.startTime}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => window.location.href = `/room/${room.id}`}
                >
                  Join Room
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
