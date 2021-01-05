import fs from 'fs';
import changeCase from 'change-case';
import createBanner from 'create-banner';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import config from './tsconfig.json';

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

export default formats.map((format) => ({
  input: 'src/index.ts',
  output: modes.map((mode) => ({
    name,
    format,
    banner: pkg.name === 'cropper' ? banner : undefined,
    file: `dist/${pkg.name}${format === 'umd' ? '' : `.${format}`}${mode === 'production' ? '.min' : ''}.js`,
    plugins: mode === 'production' ? [terser()] : [],
  })),
  external: pkg.name === 'cropper' ? [] : Object.keys(pkg.dependencies || {}),
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(config.compilerOptions),
    replace({
      __VERSION__: pkg.version,
    }),
  ],
}));
