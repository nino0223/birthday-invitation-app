import { Calendar, Clock, MapPin } from "lucide-react"
import { EVENT_DETAILS } from "@/lib/constants"
import Image from "next/image"

export function InvitationCard() {
  return (
    <section className="relative z-10 text-center mb-16">
      <h1 className="font-heading text-6xl md:text-8xl text-pink-600 mb-8 animate-bounce">Du är bjuden!</h1>

      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-pink-200 to-purple-200">
          <Image src="/festive-birthday-party-with-balloons-and-confetti.jpg" alt="Birthday Party" fill className="object-cover" />
        </div>

        <div className="p-8">
          <h2 className="font-heading text-4xl md:text-5xl text-pink-600 mb-6">{EVENT_DETAILS.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <Calendar className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <p className="font-bold text-gray-800 text-sm mb-1">När</p>
              <p className="text-gray-700 text-lg font-semibold">{EVENT_DETAILS.date}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <p className="font-bold text-gray-800 text-sm mb-1">Tid</p>
              <p className="text-gray-700 text-lg font-semibold">{EVENT_DETAILS.time}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <MapPin className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <p className="font-bold text-gray-800 text-sm mb-1">Var</p>
              <p className="text-gray-700 text-lg font-semibold">{EVENT_DETAILS.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
