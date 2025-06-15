/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-gradient':
          'linear-gradient(135deg, rgba(55,65,81,0.8), rgba(147,51,234,0.8))',
      },
    },
  },
  plugins: [forms],
}
