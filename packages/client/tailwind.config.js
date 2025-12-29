/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          hub: '#050510',
          red: '#FF1F1F',
          green: '#00FA9A',
          blue: '#00F3FF',
          dark: '#0a0a1f',
          glass: 'rgba(0, 243, 255, 0.1)',
        },
        // Santa Theme Palette
        santa: {
            red: '#D42426',
            green: '#165B33',
            gold: '#F8B229',
            midnight: '#0B1120', // Deep Navy
        }
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        santa: ['"Mountains of Christmas"', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
      },
    },
  },
  plugins: [],
}
