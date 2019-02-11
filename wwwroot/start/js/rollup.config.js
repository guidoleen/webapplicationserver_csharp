import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.js',
  dest: 'build/build.js',
  format: 'iife',
  sourceMap: 'inline',
  external: [ 'ol' ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
  ],
};