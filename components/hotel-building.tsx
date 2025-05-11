"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Room = {
  id: string
  number: string
  floor: number
  type: "individual" | "doble" | "familiar"
  available: boolean
  price: number // Añadimos precio para mostrar en la selección
}

type HotelBuildingProps = {
  onSelectRoom: (room: Room) => void
  selectedRooms: Room[]
}

export default function HotelBuilding({ onSelectRoom, selectedRooms }: HotelBuildingProps) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  // Usamos useMemo para generar las habitaciones solo una vez
  const rooms = useMemo(() => {
    const generatedRooms: Room[] = []
    for (let floor = 1; floor <= 6; floor++) {
      for (let room = 1; room <= 5; room++) {
        const roomNumber = `${floor}0${room}`
        const roomType = room % 3 === 0 ? "familiar" : room % 2 === 0 ? "doble" : "individual"

        // Asignamos precios según el tipo de habitación
        let price = 0
        if (roomType === "individual") price = 80000
        else if (roomType === "doble") price = 120000
        else price = 180000

        generatedRooms.push({
          id: roomNumber,
          number: roomNumber,
          floor,
          type: roomType,
          available: Math.random() > 0.3, // 70% de habitaciones disponibles
          price,
        })
      }
    }
    return generatedRooms
  }, []) // Array de dependencias vacío para que solo se ejecute una vez

  const handleFloorClick = (floor: number) => {
    setSelectedFloor(floor)
  }

  // También usamos useMemo para filtrar las habitaciones por piso
  const floorRooms = useMemo(() => {
    return selectedFloor ? rooms.filter((room) => room.floor === selectedFloor) : []
  }, [selectedFloor, rooms])

  // Verificar si una habitación ya está seleccionada
  const isRoomSelected = (roomId: string) => {
    return selectedRooms.some((room) => room.id === roomId)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-xl font-bold mb-4">Seleccione un piso y habitación</h3>
        <p className="text-gray-600 mb-6">
          Haga clic en un piso para ver las habitaciones disponibles y seleccione una o más para su reserva.
        </p>

        {/* Building Visualization */}
        <div className="relative w-full max-w-md h-[400px] bg-gray-100 rounded-lg shadow-md overflow-hidden gold-shadow">
          {/* Building Floors */}
          <div className="absolute inset-0 flex flex-col-reverse">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((floor) => (
              <div
                key={floor}
                className={cn(
                  "flex-1 border-t border-gray-300 transition-all duration-300 cursor-pointer flex items-center justify-center",
                  selectedFloor === floor
                    ? "bg-hotel-red/20 border-hotel-red"
                    : "hover:bg-gray-200 hover:border-gray-400",
                )}
                onClick={() => handleFloorClick(floor)}
              >
                <span className="font-bold text-lg">Piso {floor}</span>
              </div>
            ))}
          </div>

          {/* Building Side */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-300 flex flex-col-reverse">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((floor) => (
              <div
                key={floor}
                className="flex-1 border-t border-gray-400 flex items-center justify-center"
                onClick={() => handleFloorClick(floor)}
              >
                <span className="font-bold text-sm">{floor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Room Selection */}
      {selectedFloor && (
        <div className="bg-white p-6 rounded-lg shadow-md gold-shadow">
          <h4 className="text-lg font-bold mb-4">Habitaciones en Piso {selectedFloor}</h4>
          <div className="grid grid-cols-5 gap-3">
            {floorRooms.map((room) => (
              <Button
                key={room.id}
                variant={room.available ? (isRoomSelected(room.id) ? "secondary" : "outline") : "ghost"}
                className={cn(
                  "h-20 relative flex flex-col",
                  room.available
                    ? isRoomSelected(room.id)
                      ? "bg-hotel-gold text-hotel-black border-hotel-gold"
                      : "hover:bg-hotel-gold/10 hover:border-hotel-gold"
                    : "bg-hotel-red/20 border-hotel-red text-hotel-red cursor-not-allowed",
                  hoveredRoom === room.id && "ring-2 ring-hotel-gold",
                )}
                disabled={!room.available || isRoomSelected(room.id)}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                onClick={() => room.available && onSelectRoom(room)}
              >
                <div className="flex flex-col items-center">
                  <span className="font-bold">{room.number}</span>
                  <span className="text-xs">
                    {room.type === "individual" ? "Individual" : room.type === "doble" ? "Doble" : "Familiar"}
                  </span>
                  <span className="text-xs mt-1">${room.price.toLocaleString()}</span>
                </div>
              </Button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
              <span className="text-sm">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-hotel-red/20 border border-hotel-red rounded"></div>
              <span className="text-sm">No disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-hotel-gold border border-hotel-gold rounded"></div>
              <span className="text-sm">Seleccionada</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
