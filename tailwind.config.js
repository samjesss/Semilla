/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf7f0',
          100: '#cfeadd',
          200: '#a7d8c1',
          400: '#47aa78',
          500: '#23865d',
          600: '#126947',
          700: '#0b5138',
          800: '#073c2c',
        },
        secondary: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#2f6fcf',
          600: '#234f9c',
          700: '#1c3d79',
        },
        accent: {
          50: '#fff7e1',
          100: '#ffe9ae',
          500: '#e7ad35',
          600: '#bc7f18',
          700: '#8c5a10',
        },
        ink: '#17231f',
        clay: '#b85f43',
        maize: '#e7ad35',
        river: '#2f6fcf',
        leaf: '#126947',
        surface: '#f6f4ed',
        card: '#FFFFFF',
        slate: {
          850: '#151e2e',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 18px 32px -18px rgba(23, 35, 31, 0.22)',
        'paper': '0 1px 0 rgba(23, 35, 31, 0.08), 0 18px 40px -24px rgba(23, 35, 31, 0.28)',
        'glow': '0 0 0 4px rgba(18, 105, 71, 0.12)',
      }
    },
  },
  plugins: [],
}
