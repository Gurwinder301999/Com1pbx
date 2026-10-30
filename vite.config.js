import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    {
      name: 'include-licenses',
      apply: 'build',
      async generateBundle() {
        for (const [source, destination] of [
          ['vendor/THIRD_PARTY_LICENSES.txt', 'licenses/THIRD_PARTY_LICENSES.txt'],
          ['vendor/react-ui.js.LEGAL.txt', 'licenses/react-ui.js.LEGAL.txt'],
          ['fonts/LICENSE.txt', 'licenses/Manrope-LICENSE.txt'],
        ]) {
          this.emitFile({
            type: 'asset',
            fileName: destination,
            source: await readFile(new URL(source, import.meta.url)),
          });
        }
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
