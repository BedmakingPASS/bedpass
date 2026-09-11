import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Tambahkan baris ini agar path file aset (.js / .css) tidak rusak saat online
  server: {
    port: 5173,
    open: true,
  },
})
