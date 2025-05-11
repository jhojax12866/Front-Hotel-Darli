import { MapPin, Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Contact() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Contacto</h2>
        <div className="h-1 w-20 bg-hotel-gold mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-hotel-gold/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-hotel-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Dirección</h3>
              <p>Av. San Francisco Calle 14 #12-30, Mocoa Putumayo</p>
              <p className="text-sm text-muted-foreground mt-1">Una cuadra antes del hospital José María Hernández</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-hotel-gold/10 p-3 rounded-full">
              <Phone className="h-6 w-6 text-hotel-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Teléfonos</h3>
              <p>Celular: 313 816 5536</p>
              <p>Fijo: 42 04257</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-hotel-gold/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-hotel-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Correo Electrónico</h3>
              <p>hoteldarlin@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-hotel-gold/10 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-hotel-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <Button
                asChild
                variant="outline"
                className="mt-2 border-hotel-red text-hotel-red hover:bg-hotel-red hover:text-white"
              >
                <Link href="https://wa.me/573138165536" target="_blank">
                  Enviar mensaje
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[400px] rounded-lg overflow-hidden gold-shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5774899639136!2d-76.6525!3d1.1488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e28b37d1b7c1eb7%3A0x7b778e0cefd7d7a0!2sMocoa%2C%20Putumayo!5e0!3m2!1ses!2sco!4v1620160000000!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Hotel Darlin"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
