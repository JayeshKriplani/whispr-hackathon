"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { SoundscapeSelector } from "@/components/soundscape-selector"

export default function CreateRoomPage() {
  const router = useRouter()
  const [roomName, setRoomName] = useState("")
  const [soundscape, setSoundscape] = useState("forest")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomName.trim()) {
      // In a real app, we would create the room on the server
      // For now, just navigate to a mock room URL
      const roomSlug = roomName.toLowerCase().replace(/\s+/g, "-")
      router.push(`/room/${roomSlug}`)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <main className="container max-w-md mx-auto px-4 py-8">
        <Button variant="ghost" size="icon" className="mb-6" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Card className="dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader>
            <CardTitle className="text-xl">Create a new room</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="room-name">Room name</Label>
                <Input
                  id="room-name"
                  placeholder="What's this room about?"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>

              <SoundscapeSelector current={soundscape} onChange={setSoundscape} />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={!roomName.trim()}>
                Create Room
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
