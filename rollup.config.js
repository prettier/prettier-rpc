import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  entry: 'prettier-rpc.js',
  dest: 'dist/prettier-rpc-' + require('./package.json').dependencies.prettier + '.min.js',
  format: 'cjs',
  plugins: [
    json(),
    commonjs(),
    resolve(),
  ],
  useStrict: false,
  external: ['assert'],
};
