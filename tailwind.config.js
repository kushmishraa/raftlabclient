/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    minHeight:{
      '1/2':'50%',
      '967' : '967px'
    },
    maxWidth:{
      '638' : "638px",
      '100' : "100px"
    }
    ,
    maxHeight:{
      '967' : "967px",
      '400' : "400px"
    }
  },
  plugins: [],
}

