import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Colores principales del Hotel Darlin
        "hotel-red": "#C41E3A", // Rojo elegante
        "hotel-gold": "#D4AF37", // Dorado
        "hotel-black": "#1A1A1A", // Negro rico

        // Variaciones para uso en diferentes contextos
        "hotel-red-light": "#E84C66",
        "hotel-gold-light": "#E6C667",
        "hotel-gray": "#333333", // Gris oscuro para textos

        // Colores para el sistema de UI
        primary: {
          DEFAULT: "#C41E3A", // Rojo como color primario
          foreground: "#FFFFFF", // Texto blanco sobre rojo
        },
        secondary: {
          DEFAULT: "#D4AF37", // Dorado como color secundario
          foreground: "#1A1A1A", // Texto negro sobre dorado
        },

        // Colores del sistema
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#D4AF37", // Dorado para los anillos de focus
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#D4AF37", // Dorado como acento
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
