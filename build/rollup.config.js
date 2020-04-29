import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
export default {
  input: 'src/plugins/vue-imgix',
  output: {
    name: 'Imgix',
    exports: 'named',
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs(),
    vue({
      compileTemplate: true, // Explicitly convert template to render function
    }),
    babel({
      runtimeHelpers: true,
    }),
  ],
};
