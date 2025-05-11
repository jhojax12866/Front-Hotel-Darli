import type { Metadata } from "next"
import Hero from "@/components/hero"
import RoomTypes from "@/components/room-types"
import AboutUs from "@/components/about-us"
import Reservations from "@/components/reservations"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Hotel Darlin - La satisfacción que usted merece",
  description:
    "Hotel Darlin ofrece habitaciones con baño privado, TV plasma, wifi, ventilador y servicio a la habitación en Mocoa, Putumayo.",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section id="inicio">
          <Hero />
          <RoomTypes />
        </section>
        <section id="nosotros" className="py-16 bg-gray-50">
          <AboutUs />
        </section>
        <section id="reservas" className="py-16">
          <Reservations />
        </section>
        <section id="contacto" className="py-16 bg-gray-50">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}
