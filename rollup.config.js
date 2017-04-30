const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'src/js/cropper.js',
  targets: [
    {
      dest: 'dist/cropper.js',
    },
    {
      dest: 'dist/cropper.common.js',
      format: 'cjs',
    },
    {
      dest: 'dist/cropper.esm.js',
      format: 'es',
    },
    {
      dest: 'docs/js/cropper.js',
    },
  ],
  format: 'umd',
  moduleName: 'Cropper',
  plugins: [
    babel({
      exclude: '/node_modules/**',
    }),
  ],
};
