"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { RSVP_API_URL } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

type AttendanceStatus = "yes" | "no" | null

export function RSVPForm() {
  const [name, setName] = useState("")
  const [attendance, setAttendance] = useState<AttendanceStatus>(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !attendance) {
      setErrorMessage("Vänligen fyll i ditt namn och välj om du kan komma.")
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch(RSVP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          attendance: attendance === "yes" ? "Kommer!" : "Kan tyvärr inte",
          message,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setName("")
        setAttendance(null)
        setMessage("")
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Något gick fel. Kontrollera att Formspree-ID är konfigurerat i constants.ts")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
        <h3 className="font-heading text-4xl text-pink-600 mb-3">Tack för ditt svar!</h3>
        <p className="text-gray-700 text-xl">Vi ser fram emot att fira tillsammans!</p>
        <Button
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold"
        >
          Skicka ett till svar
        </Button>
      </div>
    )
  }

  return (
    <section className="relative z-10 max-w-2xl mx-auto">
      <h2 className="font-heading text-5xl md:text-6xl text-pink-600 text-center mb-8">OSA här!</h2>

      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-800 font-bold mb-2 text-lg">
              Barn namn:
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ditt barns namn"
              className="w-full text-2xl font-extrabold text-pink-600 border-2 border-pink-300 focus:border-pink-500 rounded-xl p-4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-bold mb-3 text-lg">Kan du komma?</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAttendance("yes")}
                className={`p-6 rounded-2xl border-4 transition-all font-bold text-2xl ${
                  attendance === "yes"
                    ? "bg-pink-600 text-white border-pink-700 scale-105 shadow-xl"
                    : "bg-white text-pink-600 border-pink-300 hover:border-pink-500"
                }`}
              >
                JAAA! 🎉
              </button>
              <button
                type="button"
                onClick={() => setAttendance("no")}
                className={`p-6 rounded-2xl border-4 transition-all font-bold text-2xl ${
                  attendance === "no"
                    ? "bg-gray-600 text-white border-gray-700 scale-105 shadow-xl"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                }`}
              >
                Tyvärr inte 😢
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-800 font-bold mb-2 text-lg">
              Meddelande (valfritt)
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Har du några allergier eller annat vi bör veta om?"
              className="w-full text-xl font-bold text-gray-700 border-2 border-pink-300 focus:border-pink-500 rounded-xl p-4 min-h-32"
              rows={4}
            />
          </div>

          {submitStatus === "error" && (
            <div className="flex items-center gap-3 bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-700 font-semibold">{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-2xl py-6 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                Skickar...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-6 h-6" />
                Skicka OSA
              </span>
            )}
          </Button>
        </div>
      </form>
    </section>
  )
}
