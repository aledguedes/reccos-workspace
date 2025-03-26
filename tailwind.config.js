/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./projects/reccos-v2/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Azul mais vibrante
        secondary: '#10B981', // Verde esmeralda
        accent: '#F59E0B', // Âmbar
        neutral: '#374151', // Cinza escuro
        'base-100': '#FFFFFF',
        'base-content': '#1F2937', // Cor principal para textos
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        reccos: {
          primary: '#3B82F6',
          'primary-focus': '#2563EB',
          'primary-content': '#FFFFFF',
          secondary: '#10B981',
          'secondary-focus': '#059669',
          'secondary-content': '#FFFFFF',
          accent: '#F59E0B',
          'accent-focus': '#D97706',
          'accent-content': '#FFFFFF',
          neutral: '#374151',
          'neutral-focus': '#1F2937',
          'neutral-content': '#FFFFFF',
          'base-100': '#FFFFFF',
          'base-200': '#F9FAFB',
          'base-300': '#F3F4F6',
          'base-content': '#1F2937',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
