import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import license from 'rollup-plugin-license';

const path = require('path');
const minify = process.argv.includes('--minify');

// Change build process based on whether we're building a minified version.
const libConfig = {
  minified: {
    formats: ['es'],
    entry: path.resolve(__dirname, 'src/main.ts'),
    name: 'imgix-vue',
    fileName: () => 'imgix-vue.min.js',
  },
  default: {
    formats: ['es', 'umd'],
    entry: path.resolve(__dirname, 'src/main.ts'),
    name: 'imgix-vue',
    fileName: (format) => {
      if (format === 'es') {
        return `imgix-vue.esm.js`;
      }
      return `imgix-vue.${format}.js`;
    },
  },
};

const config = minify ? libConfig.minified : libConfig.default;

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    legalComments: 'none', // Preserve all legal comments.
    banner: '/*! licenses: /vendor.LICENSE.txt */',
  },
  build: {
    // Don't delete the outDir between builds.
    // NPM script deletes outDir before building.
    emptyOutDir: false,
    minify: minify,
    target: 'es2018',
    lib: {
      ...config,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // esbuild strips comments, so we need to add a banner to the output in
        // order to preserve the licenses.
        plugins: [
          license({
            thirdParty: {
              output: path.resolve(__dirname, './dist/vendor.LICENSE.txt'),
            },
          }),
        ],
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
