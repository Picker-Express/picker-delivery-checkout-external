import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/picker-delivery-checkout-external/', // Cambiar según tu repo de GitHub
  server: {
    port: 3000,
  },
})
