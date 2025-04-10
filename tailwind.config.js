// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        screens: {
          'xs': '480px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
        },
        colors: {
          // Custom color palette
          'primary': '#2A2F4F',     // Navy Blue
          'secondary': '#FF6B35',   // Orange
          'accent': '#917FB3',     // Lavender
          'light': '#F8F8F8',       // Off-white
          'dark': '#2D3142'        // Dark Gray
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif']
        }
      }
    },
    plugins: [],
  }