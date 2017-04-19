import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const version = 
  process.env.rpc ? 'rpc' : 
  process.env.lib ? 'lib' : 
  process.env.cli ? 'cli' : 'invalid';

if (version === 'invalid') {
  throw new Error('Provide a valid output version via --environment');
}

export default {
  entry: `prettier-${version}.js`,
  dest: `dist/prettier-${version}-${require('./package.json').dependencies.prettier}.min.js`,
  format: 'cjs',
  banner: version === 'cli' ? '#!/usr/bin/env node\n' : undefined,
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
