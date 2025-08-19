/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        spartan: ['League Spartan', 'sans-serif'], // merged, no duplicates
      },
      colors: {
        slateblue: '#1e4356',
      },
      letterSpacing: {
        tightest: '-0.3px',
      },
      keyframes: {
        cloudMove: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        cloudMove: 'cloudMove 20s linear infinite',
      },
    },
  },
  plugins: [],
};
