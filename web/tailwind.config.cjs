/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts, tsx}', './src/**/*'],
  theme: {
    extend: {
      backgroundImage: {
        'blur-background': "url('/src/assets/blur-background.svg')",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        cursive: ['"Baloo 2"', 'cursive'],
      },
      spacing: {
        5.5: '1.375rem',
      },
      colors: {
        yellow: {
          600: '#C47F17',
          400: '#DBAC2C',
          200: '#F1E9C9',
        },
        purple: {
          600: '#4B2995',
          400: '#8047F8',
          200: '#EBE5F9',
        },
        gray: {
          900: '#272221',
          800: '#403937',
          700: '#574F4D',
          600: '#8D8686',
          500: '#D7D5D5',
          400: '#E6E5E5',
          300: '#EDEDED',
          200: '#F3F2F2',
          100: '#FAFAFA',
        },
        white: '#ffffff',
      },
      fontSize: {
        xs: [
          '12px',
          {
            lineHeight: '130%',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '130%',
          },
        ],
        base: [
          '16px',
          {
            lineHeight: '130%',
          },
        ],
        lg: [
          '18px',
          {
            lineHeight: '130%',
          },
        ],
        xl: [
          '20px',
          {
            lineHeight: '130%',
          },
        ],
        '2xl': [
          '24px',
          {
            lineHeight: '130%',
          },
        ],
        '3xl': [
          '30px',
          {
            lineHeight: '130%',
          },
        ],
        '4xl': [
          '36px',
          {
            lineHeight: '130%',
          },
        ],
        '5xl': [
          '48px',
          {
            lineHeight: '130%',
          },
        ],
        '6xl': [
          '60px',
          {
            lineHeight: '130%',
          },
        ],
        '7xl': [
          '72px',
          {
            lineHeight: '130%',
          },
        ],
        '8xl': [
          '96px',
          {
            lineHeight: '130%',
          },
        ],
        '9xl': [
          '128px',
          {
            lineHeight: '130%',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-radix')()],
}
