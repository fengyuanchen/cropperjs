import typescript from '@rollup/plugin-typescript';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const fs = require('fs');
const changeCase = require('change-case');
const createBanner = require('create-banner');

const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));

pkg.name = pkg.name.replace('@', '').replace('/', '-').replace('js', '');

const name = changeCase.pascalCase(pkg.name);
const banner = createBanner({
  data: {
    name,
    year: '2015-present',
  },
  template: 'inline',
});
const formats = ['esm', 'umd'];
const modes = ['development', 'production'];

module.exports = formats.map((format) => ({
  input: 'src/index.ts',
  output: modes.map((mode) => ({
    banner,
    name,
    format,
    file: `dist/${pkg.name}${format === 'umd' ? '' : `.${format}`}${mode === 'production' ? '.min' : ''}.js`,
    plugins: mode === 'production' ? [terser()] : [],
  })),
  plugins: [
    typescript(),
    // nodeResolve({
    //   extensions: ['.mjs', '.js', '.json', '.node', '.ts'],
    //   moduleDirectories: ['node_modules', 'packages'],
    // }),
    // commonjs({
    //   extensions: ['.mjs', '.js', '.json', '.node', '.ts'],
    // }),
  ],
}));
