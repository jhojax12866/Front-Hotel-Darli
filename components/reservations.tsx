"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, differenceInYears } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import HotelBuilding, { type Room } from "./hotel-building"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Definimos el esquema para el formulario principal
const mainFormSchema = z
  .object({
    name: z.string().min(2, { message: "El nombre es requerido" }),
    phone: z.string().min(7, { message: "Ingrese un número de teléfono válido" }),
    identification: z.string().min(8, { message: "Ingrese un número de identificación válido" }),
    birthDate: z
      .date({ required_error: "Seleccione su fecha de nacimiento" })
      .refine((date) => differenceInYears(new Date(), date) >= 18, {
        message: "Debe ser mayor de 18 años para realizar una reserva",
      }),
    checkInDate: z.date({ required_error: "Seleccione una fecha para su reserva" }),
    checkOutDate: z.date({ required_error: "Seleccione una fecha de salida" }),
  })
  // Añadimos una refinación adicional para validar que checkOutDate sea posterior a checkInDate
  .refine(
    (data) => {
      if (!data.checkInDate || !data.checkOutDate) return true
      return data.checkOutDate > data.checkInDate
    },
    {
      message: "La fecha de salida debe ser posterior a la fecha de entrada",
      path: ["checkOutDate"], // Esto indica que el error está en el campo checkOutDate
    },
  )

// Definimos el esquema para el formulario de huésped
const guestFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido" }),
  identification: z.string().min(8, { message: "Ingrese un número de identificación válido" }),
})

// Definimos los tipos basados en los esquemas
type MainFormValues = z.infer<typeof mainFormSchema>
type GuestFormValues = z.infer<typeof guestFormSchema>

// Definimos el tipo para la información del huésped
type GuestInfo = {
  roomId: string
  roomNumber: string
  roomType: string
  name: string
  identification: string
}

export default function Reservations() {
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([])
  const [guestInfo, setGuestInfo] = useState<GuestInfo[]>([])
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false)
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  // Inicializamos el formulario principal
  const mainForm = useForm<MainFormValues>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      identification: "",
    },
  })

  // Inicializamos el formulario de huésped
  const guestForm = useForm<GuestFormValues>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: "",
      identification: "",
    },
  })

  // Manejador para seleccionar una habitación
  const handleRoomSelect = (room: Room) => {
    setSelectedRooms((prev) => [...prev, room])
  }

  // Manejador para eliminar una habitación
  const removeRoom = (roomId: string) => {
    setSelectedRooms((prev) => prev.filter((room) => room.id !== roomId))
    setGuestInfo((prev) => prev.filter((guest) => guest.roomId !== roomId))
  }

  // Manejador para abrir el diálogo de información de huésped
  const openGuestDialog = (room: Room) => {
    setCurrentRoom(room)

    // Si ya existe información para esta habitación, la cargamos en el formulario
    const existingGuest = guestInfo.find((guest) => guest.roomId === room.id)
    if (existingGuest) {
      guestForm.reset({
        name: existingGuest.name,
        identification: existingGuest.identification,
      })
    } else {
      guestForm.reset({
        name: "",
        identification: "",
      })
    }

    setIsGuestDialogOpen(true)
  }

  // Manejador para guardar la información del huésped
  const handleGuestSubmit = (data: GuestFormValues) => {
    if (!currentRoom) return

    const newGuestInfo: GuestInfo = {
      roomId: currentRoom.id,
      roomNumber: currentRoom.number,
      roomType: currentRoom.type === "individual" ? "Individual" : currentRoom.type === "doble" ? "Doble" : "Familiar",
      name: data.name,
      identification: data.identification,
    }

    setGuestInfo((prev) => {
      // Reemplazar si ya existe, agregar si no
      const exists = prev.some((guest) => guest.roomId === currentRoom.id)
      if (exists) {
        return prev.map((guest) => (guest.roomId === currentRoom.id ? newGuestInfo : guest))
      } else {
        return [...prev, newGuestInfo]
      }
    })

    setIsGuestDialogOpen(false)
    guestForm.reset()
  }

  // Manejador para enviar el formulario principal
  const onSubmit = (data: MainFormValues) => {
    if (selectedRooms.length === 0) {
      alert("Por favor seleccione al menos una habitación")
      return
    }

    // Verificar que todas las habitaciones tengan información de huésped
    const missingGuestInfo = selectedRooms.some((room) => !guestInfo.some((guest) => guest.roomId === room.id))

    if (missingGuestInfo) {
      alert("Por favor, complete la información de huésped para todas las habitaciones seleccionadas")
      return
    }

    const formattedCheckIn = format(data.checkInDate, "dd/MM/yyyy", { locale: es })
    const formattedCheckOut = format(data.checkOutDate, "dd/MM/yyyy", { locale: es })

    // Calcular el total de la reserva
    const totalPrice = selectedRooms.reduce((sum, room) => sum + room.price, 0)

    // Construir el mensaje para WhatsApp
    let message = `Hola, mi nombre es ${data.name} con identificación ${data.identification}. Me gustaría reservar las siguientes habitaciones del ${formattedCheckIn} al ${formattedCheckOut}:\n\n`

    selectedRooms.forEach((room, index) => {
      const guest = guestInfo.find((g) => g.roomId === room.id)
      message += `${index + 1}. Habitación ${room.number} (${room.type === "individual" ? "Individual" : room.type === "doble" ? "Doble" : "Familiar"}) del piso ${room.floor}`
      if (guest) {
        message += ` a nombre de ${guest.name} (ID: ${guest.identification})`
      }
      message += `\n`
    })

    message += `\nTotal de la reserva: $${totalPrice.toLocaleString()}\n`
    message += `Mi número de contacto es ${data.phone}.`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/573138165536?text=${encodedMessage}`, "_blank")
  }

  // Función para calcular el total de la reserva
  const calculateTotal = () => {
    return selectedRooms.reduce((sum, room) => sum + room.price, 0)
  }

  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Reservas</h2>
        <div className="h-1 w-20 bg-hotel-gold mx-auto"></div>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Reserve una o varias habitaciones en Hotel Darlin y disfrute de una estancia confortable en Mocoa, Putumayo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="order-2 md:order-1">
          <HotelBuilding onSelectRoom={handleRoomSelect} selectedRooms={selectedRooms} />
        </div>

        <div className="order-1 md:order-2 space-y-6">
          <Card className="bg-white rounded-lg shadow-md gold-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Formulario de Reserva</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...mainForm}>
                <form onSubmit={mainForm.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Información del Titular</h3>

                    <FormField
                      control={mainForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ingrese su nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mainForm.control}
                      name="identification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Identificación</FormLabel>
                          <FormControl>
                            <Input placeholder="Ingrese su número de identificación" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mainForm.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha de Nacimiento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: es })
                                  ) : (
                                    <span>Seleccione su fecha de nacimiento</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                fromYear={1940}
                                toYear={new Date().getFullYear() - 18}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={mainForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Contacto</FormLabel>
                          <FormControl>
                            <Input placeholder="Ingrese su número de teléfono" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Fechas de Estancia</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={mainForm.control}
                        name="checkInDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha de Entrada</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: es })
                                    ) : (
                                      <span>Seleccione fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={mainForm.control}
                        name="checkOutDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha de Salida</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: es })
                                    ) : (
                                      <span>Seleccione fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    const checkInDate = mainForm.getValues("checkInDate")
                                    return !checkInDate || date <= checkInDate
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Habitaciones Seleccionadas</h3>

                    {selectedRooms.length === 0 ? (
                      <div className="text-center p-4 border border-dashed rounded-md">
                        <p className="text-muted-foreground">No ha seleccionado ninguna habitación</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Seleccione habitaciones del edificio del hotel
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedRooms.map((room) => {
                          const guest = guestInfo.find((g) => g.roomId === room.id)

                          return (
                            <div key={room.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div>
                                <p className="font-medium">
                                  Habitación {room.number} (
                                  {room.type === "individual"
                                    ? "Individual"
                                    : room.type === "doble"
                                      ? "Doble"
                                      : "Familiar"}
                                  )
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Piso {room.floor} - ${room.price.toLocaleString()}
                                </p>
                                {guest ? (
                                  <p className="text-xs mt-1">
                                    <span className="font-medium">Huésped:</span> {guest.name}
                                  </p>
                                ) : (
                                  <p className="text-xs mt-1 text-hotel-red">Falta información del huésped</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-2 border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-hotel-black"
                                  onClick={() => openGuestDialog(room)}
                                >
                                  <User className="h-4 w-4 mr-1" />
                                  {guest ? "Editar" : "Añadir"} huésped
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 border-hotel-red text-hotel-red hover:bg-hotel-red hover:text-white"
                                  onClick={() => removeRoom(room.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <p className="font-semibold">Total:</p>
                          <p className="font-bold text-lg">${calculateTotal().toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-hotel-red hover:bg-hotel-red-light"
                    disabled={selectedRooms.length === 0}
                  >
                    Reservar por WhatsApp
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog para información del huésped */}
      <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Información del Huésped</DialogTitle>
            <DialogDescription>
              {currentRoom && (
                <p>
                  Habitación {currentRoom.number} (
                  {currentRoom.type === "individual"
                    ? "Individual"
                    : currentRoom.type === "doble"
                      ? "Doble"
                      : "Familiar"}
                  ) - Piso {currentRoom.floor}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>

          <Form {...guestForm}>
            <form onSubmit={guestForm.handleSubmit(handleGuestSubmit)} className="space-y-4">
              <FormField
                control={guestForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Huésped</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre del huésped" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={guestForm.control}
                name="identification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Identificación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el número de identificación" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsGuestDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
