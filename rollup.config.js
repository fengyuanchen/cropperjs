import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const fs = require('fs');
const changeCase = require('change-case');
const createBanner = require('create-banner');
const config = require('./tsconfig.json');

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
    nodeResolve(),
    commonjs(),
    typescript(config.compilerOptions),
    replace({
      __VERSION__: pkg.version,
    }),
  ],
}));
