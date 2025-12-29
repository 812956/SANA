/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        santa: {
            red: '#D42426',    // Classic Christmas Red
            green: '#165B33',  // Deep Pine Green
            gold: '#F8B229',   // Warm Gold
            midnight: '#0a0e1a', // Deepest Navy (enhanced)
            'midnight-light': '#1A2236',
            'midnight-mid': '#0f1729',
            'navy': '#1e293b',
            surface: 'rgba(11, 17, 32, 0.85)', // Glassy dark surface
            'surface-light': 'rgba(30, 41, 59, 0.6)',
        },
        // Keeping 'cyber' prefix for compatibility
        cyber: {
          hub: '#0a0e1a',
          glass: 'rgba(11, 17, 32, 0.6)',
          gold: '#F8B229',
        }
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        santa: ['"Mountains of Christmas"', 'cursive'],
      },
      backgroundImage: {
        'santa-gradient': 'radial-gradient(circle at 50% 20%, #1e293b 0%, #0f1729 40%, #0a0e1a 100%)',
        'glass-panel': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'vignette': 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-lg': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'glow-gold': '0 0 20px rgba(248, 178, 41, 0.3), 0 0 40px rgba(248, 178, 41, 0.1)',
        'glow-gold-lg': '0 0 30px rgba(248, 178, 41, 0.4), 0 0 60px rgba(248, 178, 41, 0.2)',
        'glow-red': '0 0 20px rgba(212, 36, 38, 0.3), 0 0 40px rgba(212, 36, 38, 0.1)',
        'glow-red-lg': '0 0 30px rgba(212, 36, 38, 0.4), 0 0 60px rgba(212, 36, 38, 0.2)',
        'glow-green': '0 0 20px rgba(22, 91, 51, 0.3), 0 0 40px rgba(22, 91, 51, 0.1)',
        'glow-green-lg': '0 0 30px rgba(22, 91, 51, 0.4), 0 0 60px rgba(22, 91, 51, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'count-up': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        countUp: {
          '0%': { transform: 'translateY(5px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
