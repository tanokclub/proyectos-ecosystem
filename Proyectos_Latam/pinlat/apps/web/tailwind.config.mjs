/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8f1",
        sand: "#f6e7d3",
        terracota: "#c8553d",
        maiz: "#f2b134",
        coral: "#ff7e5f",
        fucsia: "#d83a7c",
        ocre: "#b08454",
        ink: "#2b1d14",
        muted: "#7a6a5d"
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}
