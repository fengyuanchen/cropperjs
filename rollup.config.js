const babel = require('rollup-plugin-babel');

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
};
