import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts:['gradeabull.com','localhost'],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // The URL of your backend
        changeOrigin: true,               // To handle CORS
        secure: false,                   // Set to false if your backend uses HTTP instead of HTTPS
      },
    },
  },
  plugins: [react(),
    tailwindcss()
  ],
})
