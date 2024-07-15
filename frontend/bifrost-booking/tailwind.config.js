/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      'cloud': '#565584',
      'salmon': '#FF9C9C',
      'sky': '#50C7FF',
      'moss': '#00340A',
      'leather': '#7B4F3C',
      'sand': '#FFEAB4',
    },
    extend: {
      colors: {
        'cloud': {
          50: '#F5F6F9',
          100: '#E7E9F2',
          200: '#D5D8E8',
          300: '#B8BFD8',
          400: '#959FC5',
          500: '#7C83B5',
          600: '#6A6EA6',
          700: '#5E5E97',
          800: '#565584',
          900: '#434365',
          950: '#2D2C3F',
        },
        'salmon': {
          50: '#FEF2F2',
          100: '#FFE1E1',
          200: '#FFC8C8',
          300: '#FF9C9C', // MAIN //
          400: '#FD6C6C',
          500: '#F53E3E',
          600: '#E22020',
          700: '#BE1717',
          800: '#9D1717',
          900: '#821A1A',
          950: '#470808',
        },
        'sky': {
          50: '#EDFAFF',
          100: '#D7F1FF',
          200: '#B9E8FF',
          300: '#88DCFF',
          400: '#50C7FF', // MAIN //
          500: '#28A9FF',
          600: '#0F8BFF',
          700: '#0A73EB',
          800: '#0F5CBE',
          900: '#134F95',
          950: '#11315A',
        },
        'moss': {
          50: '#EEFFEF',
          100: '#D7FFDD',
          200: '#B2FFBD',
          300: '#76FF8B',
          400: '#33F552',
          500: '#09DE2B',
          600: '#00BF1F',
          700: '#04911C',
          800: '#0A711C',
          900: '#0A5D1A',
          950: '#00340A', // MAIN //
        },
        'leather': {
          50: '#F7F4EF',
          100: '#ECE3D5',
          200: '#DAC8AE',
          300: '#C4A580',
          400: '#B3885C',
          500: '#A3774F',
          600: '#8C5F42',
          700: '#7B4F3C', // MAIN //
          800: '#603E33',
          900: '#533730',
          950: '#2F1C19',
        },
        'sand': {
          50: '#FFF9EB',
          100: '#FFEAB4', // MAIN //
          200: '#FFDD88',
          300: '#FFC74A',
          400: '#FFAF20',
          500: '#F98C07',
          600: '#DD6502',
          700: '#B74506',
          800: '#94340C',
          900: '#7A2B0D',
          950: '#461502',
        },
      }
    },
  },
  plugins: [],
}

// "Fonts": { "HeadingFont": "Felix Titling", "SubheadingFont": "Felix Titling", "BodyFont": "Felix Titling" },
