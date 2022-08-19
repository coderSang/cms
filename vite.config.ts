import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import Components from 'unplugin-vue-components/dist/vite.js';
// @ts-ignore
import { AntDesignVueResolver } from 'unplugin-vue-components/dist/resolvers.js';

export default defineConfig({
  envDir: './',
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
});
