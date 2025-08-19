// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  safelist: [
    {
      pattern: /token/,
    },
  ],
  theme: {
    extend: {
         keyframes: {
        train: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-320px)' },
        },
      },
      animation: {
        train: 'train 3.2s ease-in-out infinite',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
  ],
};
