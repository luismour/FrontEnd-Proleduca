// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Certifique-se que cobre todos os seus arquivos
  ],
  darkMode: 'class', // ESSENCIAL para o modo escuro baseado em classe
  theme: {
    extend: {

       colors: {
         dark: {
            background: '#1a202c',
            text: '#e2e8f0',
            card: '#2d3748',
         }
       }
    },
  },
  plugins: [],
}