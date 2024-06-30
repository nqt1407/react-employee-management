/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/init-data.json',
          dest: 'assets',
        },
      ],
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', 'e2e/**'],
    coverage: {
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/test/**/*.{js,jsx,ts,tsx}',
        '!src/config/**/*.{js,jsx,ts,tsx}',
      ],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    assetsInlineLimit: 4096,
  },
});
