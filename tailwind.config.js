/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Ocean Blue Theme
        ocean: {
          900: '#020d1a',
          800: '#041628',
          700: '#062040',
          600: '#0a3060',
          500: '#0d4a7a',
          400: '#1a6fa0',
          300: '#2a8ac9',
          200: '#4aacdb',
          100: '#7ac9e8',
          50: '#c5e8f5',
        },
        // Accent Colors
        cyan: '#00e5ff',
        purple: '#8b5cf6',
        pink: '#f472b6',
        amber: '#fbbf24',
        green: '#34d399',
        red: '#ef4444',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
}
