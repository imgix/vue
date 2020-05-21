import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
export default [
  // ES Modules build
  {
    input: 'src/plugins/vue-imgix/index.ts',
    output: {
      format: 'esm',
      name: 'Imgix',
      exports: 'named',
      file: 'dist/vue-imgix.esm.js',
    },
    external: ['vue'],
    plugins: [
      resolve({
        browser: true,
      }),
      typescript(),
      vue({
        compileTemplate: true, // Explicitly convert template to render function
      }),
      buble({
        objectAssign: true,
      }),
      commonjs(),
    ],
  },
  // UMD build
  {
    input: 'src/plugins/vue-imgix/index.ts',
    output: {
      format: 'umd',
      name: 'Imgix',
      exports: 'named',
      file: 'dist/vue-imgix.umd.js',
    },
    external: ['vue'],
    plugins: [
      resolve(),
      typescript(),
      vue({
        compileTemplate: true, // Explicitly convert template to render function
      }),
      buble({
        objectAssign: true,
      }),
      commonjs(),
    ],
  },
  // Standalone build
  {
    input: 'src/plugins/vue-imgix/index.ts',
    output: {
      format: 'iife',
      name: 'Imgix',
      exports: 'named',
      file: 'dist/vue-imgix.min.js',
    },
    external: ['vue'],
    global: {
      vue: 'Vue',
    },
    plugins: [
      resolve(),
      typescript(),
      vue({
        compileTemplate: true, // Explicitly convert template to render function
      }),
      buble({
        objectAssign: true,
      }),
      commonjs(),
    ],
  },
];
