/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bourso: '#D20073',
        'bourso-light': '#FF0D77',
        'bourso-dark': '#1a0a2e',
        'bourso-blue': '#003883',
      },
      fontFamily: {
        proxima: ['ProximaNova', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
