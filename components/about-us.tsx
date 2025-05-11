"use client"

import Image from "next/image"
import { Bed, Wifi, Tv, Coffee, Target, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutUs() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nosotros</h2>
        <div className="h-1 w-20 bg-hotel-gold mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <p className="text-lg mb-6">
            Hotel Darlin ofrece habitaciones con baño privado, TV plasma, wifi, ventilador y servicio a la habitación.
            Estamos ubicados en Av. San Francisco Calle 14 # 12-30, una cuadra antes del hospital José María Hernández.
            Mocoa, Putumayo.
          </p>

          <p className="text-lg mb-6">
            Nuestro hotel se ha convertido en un referente de calidad y servicio en la región, brindando a nuestros
            huéspedes una experiencia confortable y memorable durante su estancia en Mocoa.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex items-center gap-3">
              <Bed className="h-8 w-8 text-hotel-gold" />
              <span className="font-medium">Habitaciones Cómodas</span>
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

        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg gold-shadow">
          <Image
            src="/h2.jpeg"
            alt="Hotel Darlin Interior"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <Tabs defaultValue="mision">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="mision"
              className="flex items-center gap-2 data-[state=active]:bg-hotel-red data-[state=active]:text-white"
            >
              <Target className="h-4 w-4" />
              Misión
            </TabsTrigger>
            <TabsTrigger
              value="vision"
              className="flex items-center gap-2 data-[state=active]:bg-hotel-red data-[state=active]:text-white"
            >
              <Eye className="h-4 w-4" />
              Visión
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mision" className="p-6 bg-white rounded-lg shadow mt-4 gold-shadow">
            <h3 className="text-2xl font-bold mb-4 text-hotel-red">Nuestra Misión</h3>
            <p className="text-lg">
              En Hotel Darlin, nuestra misión es proporcionar a nuestros huéspedes una experiencia de alojamiento
              excepcional, combinando comodidad, calidad y un servicio personalizado que supere sus expectativas.
              Trabajamos con dedicación para crear un ambiente acogedor donde cada visitante se sienta como en casa,
              contribuyendo al desarrollo turístico de Mocoa y la región del Putumayo.
            </p>
          </TabsContent>
          <TabsContent value="vision" className="p-6 bg-white rounded-lg shadow mt-4 gold-shadow">
            <h3 className="text-2xl font-bold mb-4 text-hotel-red">Nuestra Visión</h3>
            <p className="text-lg">
              Ser reconocidos como el hotel líder en Mocoa, destacándonos por la excelencia en el servicio, la
              innovación constante y el compromiso con la satisfacción de nuestros huéspedes. Aspiramos a expandir
              nuestras instalaciones y servicios, manteniendo siempre los más altos estándares de calidad y
              sostenibilidad, y contribuyendo positivamente al desarrollo económico y turístico de nuestra región.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
