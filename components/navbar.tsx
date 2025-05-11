"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-hotel-black text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl md:text-2xl text-hotel-gold">
            Hotel Darlin
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#inicio" className="text-sm font-medium hover:text-hotel-gold transition-colors">
            Inicio
          </Link>
          <Link href="#nosotros" className="text-sm font-medium hover:text-hotel-gold transition-colors">
            Nosotros
          </Link>
          <Link href="#reservas" className="text-sm font-medium hover:text-hotel-gold transition-colors">
            Reservas
          </Link>
          <Link href="#contacto" className="text-sm font-medium hover:text-hotel-gold transition-colors">
            Contacto
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="ml-2 flex items-center gap-1 border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-hotel-black"
          >
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-hotel-gold hover:bg-transparent"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-hotel-black z-40 flex flex-col">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="#inicio"
              className="text-lg font-medium p-2 hover:bg-hotel-black/20 hover:text-hotel-gold rounded-md"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              href="#nosotros"
              className="text-lg font-medium p-2 hover:bg-hotel-black/20 hover:text-hotel-gold rounded-md"
              onClick={closeMenu}
            >
              Nosotros
            </Link>
            <Link
              href="#reservas"
              className="text-lg font-medium p-2 hover:bg-hotel-black/20 hover:text-hotel-gold rounded-md"
              onClick={closeMenu}
            >
              Reservas
            </Link>
            <Link
              href="#contacto"
              className="text-lg font-medium p-2 hover:bg-hotel-black/20 hover:text-hotel-gold rounded-md"
              onClick={closeMenu}
            >
              Contacto
            </Link>
            <Button
              variant="outline"
              className="flex items-center gap-1 mt-4 w-full justify-center border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-hotel-black"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
