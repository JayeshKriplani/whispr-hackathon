"use client"

import { Button } from "@/components/ui/button"
import { Cloud, TreePine, Waves, Sparkles, Moon } from "lucide-react"

interface SoundscapeSelectorProps {
  current: string
  onChange: (soundscape: string) => void
}

export function SoundscapeSelector({ current, onChange }: SoundscapeSelectorProps) {
  const soundscapes = [
    { id: "rain", icon: Cloud, label: "Rain" },
    { id: "forest", icon: TreePine, label: "Forest" },
    { id: "waves", icon: Waves, label: "Waves" },
    { id: "ambient", icon: Sparkles, label: "Ambient" },
    { id: "night", icon: Moon, label: "Night" },
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">Soundscape</p>
      <div className="flex flex-wrap gap-2">
        {soundscapes.map((soundscape) => {
          const Icon = soundscape.icon
          const isActive = current === soundscape.id

          return (
            <Button
              key={soundscape.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={`gap-1 ${isActive ? "" : "text-neutral-600 dark:text-neutral-300"}`}
              onClick={() => onChange(soundscape.id)}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{soundscape.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
