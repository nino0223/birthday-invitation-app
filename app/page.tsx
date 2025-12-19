"use client"

import { useEffect, useState } from "react"
import { Balloon } from "@/components/balloon"
import { InvitationCard } from "@/components/invitation-card"
import { RSVPForm } from "@/components/rsvp-form"
import { BALLOON_COLORS } from "@/lib/constants"

export default function Home() {
  const [balloons, setBalloons] = useState<
    Array<{
      id: number
      color: string
      size: number
      delay: number
      duration: number
      left: number
    }>
  >([])

  useEffect(() => {
    // Generate random balloons
    const generatedBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: Math.random() * 40 + 60, // 60-100px
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15, // 15-25 seconds
      left: Math.random() * 90 + 5, // 5-95% to keep balloons on screen
    }))
    setBalloons(generatedBalloons)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Balloons background */}
      <div className="fixed inset-0 pointer-events-none">
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            color={balloon.color}
            size={balloon.size}
            delay={balloon.delay}
            duration={balloon.duration}
            left={balloon.left}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <InvitationCard />
        <RSVPForm />
      </main>
    </div>
  )
}
