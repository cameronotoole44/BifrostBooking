/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'coal': '#000',
      'smoke': '#808080',
      'cloud': '#3e5576',
      'salmon': '#FF9C9C',
      'sky': '#50C7FF',
      'moss': '#00340A',
      'leather': '#7B4F3C',
      'sand': '#FFEAB4',
      'sunrise': '#6c4861'
    },
    extend: {
      colors: {
        'cloud': {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d1dae6',
          300: '#a8bad1',
          400: '#7995b7',
          500: '#58789f',
          600: '#456084',
          700: '#3e5576',
          800: '#32435a',
          900: '#2d394d',
          950: '#1e2633',
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
        'sunrise': {
          50: '#F9F6F9',
          100: '#F4EFF4',
          200: '#EBDFEA',
          300: '#DBC6D7',
          400: '#C5A1BF',
          500: '#B084A7',
          600: '#99698C',
          700: '#815574',
          800: '#6C4861', // MAIN //
          900: '#563B4E',
          950: '#35222F',
        },
        'smoke': {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#808080', // MAIN //
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#3D3D3D',
          950: '#262626',
        },
      }
    },
  },
  plugins: [],
}









// "Fonts": { "HeadingFont": "Felix Titling", "SubheadingFont": "Felix Titling", "BodyFont": "Felix Titling" },
