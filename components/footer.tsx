import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-hotel-black text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-hotel-gold">Hotel Darlin</h3>
            <p className="text-gray-300">
              La satisfacción que usted merece. Ofrecemos habitaciones cómodas y servicios de calidad para hacer de su
              estancia una experiencia inolvidable.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-hotel-gold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-gray-300 hover:text-hotel-gold transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-gray-300 hover:text-hotel-gold transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#reservas" className="text-gray-300 hover:text-hotel-gold transition-colors">
                  Reservas
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-300 hover:text-hotel-gold transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-hotel-gold">Contacto</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Av. San Francisco Calle 14 #12-30</p>
              <p>Mocoa, Putumayo</p>
              <p>Teléfono: 313 816 5536</p>
              <p>Email: hoteldarlin@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hotel Darlin. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
