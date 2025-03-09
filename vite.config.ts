import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Это откроет сервер для всех интерфейсов
    port: 5174,        // Убедитесь, что порт совпадает с портом вашего сервера
  }
})
