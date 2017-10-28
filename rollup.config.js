const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();

module.exports = {
  input: 'src/js/cropper.js',
  output: [
    {
      file: 'dist/cropper.js',
      format: 'umd',
    },
    {
      file: 'dist/cropper.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/cropper.esm.js',
      format: 'es',
    },
    {
      file: 'docs/js/cropper.js',
      format: 'umd',
    },
  ],
  name: 'Cropper',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  banner: `/*!
 * Cropper.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2015-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`,
};
