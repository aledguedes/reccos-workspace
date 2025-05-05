/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  darkMode: 'class', // Habilita o modo escuro baseado em classe
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // Você pode adicionar outras extensões de tema específicas para daily-brief aqui
      colors: {
        // Cores específicas para daily-brief, se necessário
        // Exemplo:
        // 'db-primary': '#...',
      },
    },
  },
  plugins: [
    // Adicione plugins específicos para daily-brief aqui, se necessário
  ],
};
