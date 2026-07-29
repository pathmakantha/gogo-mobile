/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#149A6C',
        'primary-dark': '#0E8F72',
        'dark-green': '#0B3B2C',
        'deep-dark': '#0D1A15',
        'deep-dark-alt': '#0E4A37',
        'deep-dark-border': '#21382E',
        'deep-dark-card': '#142921',
        'light-bg': '#F7FAF8',
        'light-bg-alt': '#EFF4F1',
        'card-border': '#E3ECE7',
        'muted-text': '#5B7269',
        'muted-text-dark': '#8FAC9E',
        'light-accent': '#6FD1A8',
        'pill-border': '#CBDED4',
      },
      fontFamily: {
        sora: ['Sora-Regular'],
        'sora-medium': ['Sora-Medium'],
        'sora-semibold': ['Sora-SemiBold'],
        'sora-bold': ['Sora-Bold'],
        'sora-extrabold': ['Sora-ExtraBold'],
        manrope: ['Manrope-Regular'],
        'manrope-medium': ['Manrope-Medium'],
        'manrope-semibold': ['Manrope-SemiBold'],
        'manrope-bold': ['Manrope-Bold'],
        'manrope-extrabold': ['Manrope-ExtraBold'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '26px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
