/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ogcolor: "#001840",
      },
      keyframes: {
        tilt: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        fadeScale: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        tilt: "tilt 10s infinite linear",
        dropdown: 'fadeScale 0.2s ease-out forwards',
      },
      fontFamily: {
        libre: ['"Libre Baskerville"', "serif"],
        ancizar: ['"Ancizar Serif"', "serif"],
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
