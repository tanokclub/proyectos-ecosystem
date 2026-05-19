/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6',
        accent: '#f472b6',
        bg: '#0a0a0f',
        surface: '#1a1a2e',
        muted: '#71767b'
      }
    }
  },
  plugins: []
};
