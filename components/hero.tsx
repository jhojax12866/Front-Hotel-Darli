"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/h1.jpg",
    title: "Hotel Darlin",
    subtitle: "La satisfacción que usted merece",
  },
  {
    image: "/h1.jpg",
    title: "Habitaciones Confortables",
    subtitle: "Descanso y comodidad garantizados",
  },
  {
    image: "/h1.jpg",
    title: "Excelente Ubicación",
    subtitle: "En el corazón de Mocoa, Putumayo",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{slide.title}</h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-hotel-black/50 hover:bg-hotel-black/70 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-hotel-black/50 hover:bg-hotel-black/70 text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
        <Button size="lg" className="text-lg bg-hotel-red hover:bg-hotel-red-light gold-shadow">
          <Link href="#reservas">Reservar Ahora</Link>
        </Button>
      </div>
    </div>
  )
}
