/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': '343px',
      'mobileL': '372px'
    },
    fontSize: {
      'xs': '8px',
      'sm': '10px',
      '2sm': '12px',
      '3sm': '15px',
      'lg': '25px'
    },
    dropShadow: {
      'md': '3px 3px 0px rgba(0, 0, 0, 0.5)',
      '0.5lg': '0px 2px 2px rgba(0, 0, 0, 0.25)',
      'lg': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      '1.5lg': '0px 6px 6px rgba(0, 0, 0, 0.25)',
      '2lg': '0px 10px 8px rgba(0, 0, 0, 1)',
      'xl': '3px 3px 0px rgba(0, 0, 0, 1)',
      '2xl': '5px 5px 0px rgba(0, 0, 0, 1)',
      '2.5xl': '8px 8px 0px rgba(0, 0, 0, 1)',
      '3xl': '10px 10px 0px rgba(0, 0, 0, 1)',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'pearl': '#84F5BF',
      'light-pearl': '#abffea',
      'white': '#FFFEFE',
      'light-white': '#F9F0F0',
      'golden': '#ebca3b',
      'black': '#000000',
      'light-gray': '#D9D9D9',
      'dark-blue': '#0f53bf'
    }
  },
  plugins: [],
}
