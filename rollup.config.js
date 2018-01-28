const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `/*!
 * Cropper.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2015-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'dist/cropper.js',
      format: 'umd',
      name: 'Cropper',
    },
    {
      banner,
      file: 'dist/cropper.common.js',
      format: 'cjs',
    },
    {
      banner,
      file: 'dist/cropper.esm.js',
      format: 'es',
    },
    {
      banner,
      file: 'docs/js/cropper.js',
      format: 'umd',
      name: 'Cropper',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
};
