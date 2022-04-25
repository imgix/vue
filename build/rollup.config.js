import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
export default [
  // ES Modules build
  {
    input: 'src/plugins/imgix-vue/index.ts',
    output: {
      format: 'esm',
      name: 'VueImgix',
      exports: 'named',
      file: 'dist/imgix-vue.esm.js',
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
        transforms: { dangerousForOf: true },
      }),
      commonjs(),
    ],
  },
  // UMD build
  {
    input: 'src/plugins/imgix-vue/index.ts',
    output: {
      format: 'umd',
      name: 'VueImgix',
      exports: 'named',
      file: 'dist/imgix-vue.umd.js',
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
        transforms: { dangerousForOf: true },
      }),
      commonjs(),
    ],
  },
  // Standalone build
  {
    input: 'src/plugins/imgix-vue/index.ts',
    output: {
      format: 'iife',
      name: 'VueImgix',
      exports: 'named',
      file: 'dist/imgix-vue.min.js',
    },
    external: ['vue'],
    global: {
      vue: 'Vue',
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve(),
      typescript(),
      vue({
        compileTemplate: true, // Explicitly convert template to render function
      }),
      buble({
        objectAssign: true,
        transforms: { dangerousForOf: true },
      }),
      commonjs(),
    ],
  },
];
