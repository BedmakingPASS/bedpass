import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/WebsitePertama/', // <--- Tambahkan baris ini (sesuai nama repository GitHub Anda)
})
