import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bed, Users, Wifi, Tv, Coffee } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const roomTypes = [
  {
    id: 1,
    name: "Habitación Individual",
    description: "Perfecta para viajeros solitarios o viajes de negocios. Incluye una cama individual cómoda.",
    image: "/camas/cama1.jpg",
    features: ["Cama individual", "Baño privado", "TV plasma", "WiFi gratis", "Ventilador"],
    icon: <Bed className="h-6 w-6" />,
  },
  {
    id: 2,
    name: "Habitación Doble",
    description: "Ideal para parejas o dos personas. Incluye una cama matrimonial o dos camas individuales.",
    image: "/camas/doble.jpg",
    features: ["Cama matrimonial", "Baño privado", "TV plasma", "WiFi gratis", "Ventilador"],
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Habitación Familiar",
    description: "Espaciosa habitación para familias o grupos. Incluye múltiples camas para mayor comodidad.",
    image: "/camas/fami.jpeg",
    features: ["Múltiples camas", "Baño privado", "TV plasma", "WiFi gratis", "Ventilador"],
    icon: <Users className="h-6 w-6" />,
  },
]

export default function RoomTypes() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nuestras Habitaciones</h2>
        <div className="h-1 w-20 bg-hotel-gold mx-auto"></div>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Ofrecemos diferentes tipos de habitaciones para satisfacer sus necesidades de alojamiento.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roomTypes.map((room) => (
          <Card
            key={room.id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow gold-shadow"
          >
            <div className="relative h-48">
              <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-hotel-gold">{room.icon}</div>
                <h3 className="text-xl font-bold">{room.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{room.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Características:</h4>
                <ul className="space-y-1">
                  {room.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-hotel-red"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full mt-2 bg-hotel-red hover:bg-hotel-red-light">
                <Link href="#reservas">Reservar</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">
          Todas nuestras habitaciones incluyen servicio a la habitación y están diseñadas para brindarle la mayor
          comodidad durante su estancia.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-3">
            <Bed className="h-8 w-8 text-hotel-gold" />
            <span className="font-medium">Camas Cómodas</span>
          </div>
          <div className="flex items-center gap-3">
            <Wifi className="h-8 w-8 text-hotel-gold" />
            <span className="font-medium">WiFi Gratis</span>
          </div>
          <div className="flex items-center gap-3">
            <Tv className="h-8 w-8 text-hotel-gold" />
            <span className="font-medium">TV Plasma</span>
          </div>
          <div className="flex items-center gap-3">
            <Coffee className="h-8 w-8 text-hotel-gold" />
            <span className="font-medium">Servicio a la Habitación</span>
          </div>
        </div>
      </div>
    </div>
  )
}
