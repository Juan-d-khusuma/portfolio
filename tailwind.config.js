module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      azeret: ["Azeret Mono", "monospace"],
      rampart: ["Rampart One", "cursive"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
