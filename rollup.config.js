import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const type =
  process.env.rpc ? 'rpc' :
  process.env.lib ? 'lib' :
  process.env.cli ? 'cli' : 'invalid';

if (type === 'invalid') {
  throw new Error('Provide a valid output type via --environment');
}

const version = require('./package.json').dependencies.prettier;

export default {
  entry: `prettier-${type}.js`,
  dest: `dist/${version}/prettier-${type}-${version}.min.js`,
  format: 'cjs',
  banner: type === 'cli' ? '#!/usr/bin/env node\n' : undefined,
  plugins: [
    replace({
      '#!/usr/bin/env node\n': '',
    }),
    json(),
    commonjs(),
    resolve(),
  ],
  useStrict: false,
  external: [
    'assert',
    // Node modules
    'fs',
    'process',
    'path',
    'util',
    'events',
    'readline',
  ],
};
