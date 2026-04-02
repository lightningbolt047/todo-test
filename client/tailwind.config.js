import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: '#0A0A0A',
            foreground: '#E8E8E2',
            primary: {
              DEFAULT: '#F59E0B',
              foreground: '#0A0A0A',
            },
            secondary: {
              DEFAULT: '#1C1C1C',
              foreground: '#E8E8E2',
            },
            danger: {
              DEFAULT: '#EF4444',
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: '#22C55E',
              foreground: '#0A0A0A',
            },
            default: {
              DEFAULT: '#1C1C1C',
              foreground: '#E8E8E2',
            },
          },
        },
      },
    }),
  ],
}
