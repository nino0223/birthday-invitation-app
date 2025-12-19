"use client"

import { useEffect, useState } from "react"

interface BalloonProps {
  color: string
  size: number
  delay: number
  duration: number
  left: number
}

export function Balloon({ color, size, delay, duration, left }: BalloonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: "-100px",
        animation: `floatUp ${duration}s ease-in ${delay}s infinite`,
        zIndex: 0,
      }}
    >
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size * 1.2}px`,
        }}
      >
        <div
          className="rounded-full shadow-lg"
          style={{
            width: "100%",
            height: "85%",
            backgroundColor: color,
            boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.2), inset 10px 10px 20px rgba(255,255,255,0.3)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: "2px",
            height: "30px",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  )
}
