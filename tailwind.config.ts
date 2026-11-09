import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Couleurs thémables : valeurs dans app/globals.css (:root = sombre, [data-theme='light'] = clair)
      colors: {
        void: {
          DEFAULT: 'rgb(var(--c-void) / <alpha-value>)',
          2: '#070b14',
        },
        night: {
          DEFAULT: 'rgb(var(--c-night) / <alpha-value>)',
          2: '#0e1729',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          bright: 'rgb(var(--c-accent-bright) / <alpha-value>)',
          deep: '#0a7d92',
          // Cyan d'identité, toujours #22D3EE : déco uniquement (jamais du texte sur fond clair)
          brand: '#22d3ee',
        },
        'text-base': 'rgb(var(--c-ink) / <alpha-value>)',
        'text-dim': 'rgb(var(--c-ink-2) / <alpha-value>)',
        'text-muted': 'rgb(var(--c-ink-3) / <alpha-value>)',
        // Bordures et cartes : l'opacité fait partie du thème (pas de modificateur /x)
        line: 'rgb(var(--c-line) / var(--c-line-a))',
        'line-strong': 'rgb(var(--c-line-strong) / var(--c-line-strong-a))',
        surface: 'rgb(var(--c-surface) / var(--c-surface-a))',
        // État « disponible » (thème clair)
        ok: { DEFAULT: '#16a34a', text: '#15803d' },
        // Pastilles douces (fond / bordure / texte) — contraste du texte ≥ 5,2:1
        pill: {
          'cyan-bg': '#ecfeff', 'cyan-line': '#a5f3fc', 'cyan-text': '#155e75',
          'green-bg': '#ecfdf5', 'green-line': '#a7f3d0', 'green-text': '#047857',
          'amber-bg': '#fffbeb', 'amber-line': '#fde68a', 'amber-text': '#92400e',
          'rose-bg': '#fff1f2', 'rose-line': '#fecdd3', 'rose-text': '#9f1239',
          'blue-bg': '#f0f9ff', 'blue-line': '#bae6fd', 'blue-text': '#075985',
          'lime-bg': '#f7fee7', 'lime-line': '#d9f99d', 'lime-text': '#3f6212',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        hand: ['var(--font-hand)', 'cursive'],
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
