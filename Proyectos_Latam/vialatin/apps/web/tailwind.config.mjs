/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06101f",
          900: "#0a1a30",
          800: "#0f2545",
          700: "#143058",
          600: "#1c3f73",
          500: "#2455a0"
        },
        amber: {
          glow: "#fbbf24"
        },
        accent: "#fcd34d",
        ink: "#e2e8f0",
        muted: "#94a3b8",
        danger: "#ef4444",
        warning: "#f59e0b",
        ok: "#22c55e"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    },
  },
  plugins: [],
}
