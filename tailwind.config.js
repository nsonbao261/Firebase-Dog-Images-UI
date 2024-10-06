/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{tsx, ts, jsx, js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ["futura"],
        futura2: ["futura2"]
      }
    },
    colors: {
      'true-gray': {
        100: '#F5F5F5',
        400: '#A3A3A3'
      },
      'yellow': {
        900: '#9B660A',
        700: '#F1AC34',
        400: '#F7CE87',
        100: '#FDF0DB',
      },
      'blue': {
        700: '#A4AAAC',
        400: '#E3EAEC',
        100: '#F6F8F9',
      },
      'white': '#FFFFFF',
      'black': '#000000',
      'red': '#D94F14',
    }
  },
  plugins: [],
}

