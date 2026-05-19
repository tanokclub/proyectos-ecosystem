/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta dark estilo Kick/Twitch con acento verde lima
        background: "#0a0a0a",
        surface: "#141414",
        surfaceAlt: "#1c1c1c",
        border: "#242424",
        muted: "#8b8b8b",
        accent: "#53fc18",
        accentDark: "#2ecc1f",
        live: "#ef4444"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}
