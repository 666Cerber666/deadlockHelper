import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(),tailwindcss(),],
  base: './',
  resolve:{
    alias:{
      vue: "vue/dist/vue.esm-bundler.js",
    }
  },
  server: {
    host: true,
    allowedHosts: ['deadlock-helper.selfdoor.ru'],
  },
})
