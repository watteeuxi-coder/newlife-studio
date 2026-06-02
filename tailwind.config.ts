import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#05070d',
          2: '#070b14',
        },
        night: {
          DEFAULT: '#0b1120',
          2: '#0e1729',
        },
        accent: {
          DEFAULT: '#22d3ee',
          bright: '#7df0ff',
          deep: '#0a7d92',
        },
        'text-base': '#e9eef7',
        'text-dim': '#aab6cc',
        'text-muted': '#6f7e98',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'aurora-1': 'aurora1 14s ease-in-out infinite alternate',
        'aurora-2': 'aurora2 18s ease-in-out infinite alternate',
        'aurora-3': 'aurora3 22s ease-in-out infinite alternate',
        blink: 'blink 1s step-end infinite',
        'orb-spin': 'orbSpin 8s linear infinite',
        'orb-spin-rev': 'orbSpin 12s linear infinite reverse',
        'orb-spin-slow': 'orbSpin 20s linear infinite',
      },
      keyframes: {
        aurora1: {
          '0%': { transform: 'translate(-20%, -20%) scale(1)' },
          '100%': { transform: 'translate(10%, 15%) scale(1.3)' },
        },
        aurora2: {
          '0%': { transform: 'translate(20%, 10%) scale(1.2)' },
          '100%': { transform: 'translate(-15%, -10%) scale(0.9)' },
        },
        aurora3: {
          '0%': { transform: 'translate(-5%, 20%) scale(0.9)' },
          '100%': { transform: 'translate(15%, -15%) scale(1.2)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        orbSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
}

export default config
