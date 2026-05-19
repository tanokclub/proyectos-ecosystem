/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        accent: '#ec4899',
        bg: '#0a0a0f',
        surface: '#1a1a2e',
        muted: '#71767b'
      }
    }
  },
  plugins: []
};
