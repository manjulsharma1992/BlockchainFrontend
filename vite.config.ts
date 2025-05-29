import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['pdfjs-dist']
  }
});
