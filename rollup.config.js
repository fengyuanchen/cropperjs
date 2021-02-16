import fs from 'fs';
import changeCase from 'change-case';
import createBanner from 'create-banner';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import config from './tsconfig.json';

const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));
const isCropperJS = pkg.name === 'cropperjs';
const normalizeGlobalName = (name) => changeCase.pascalCase(name.replace(/(?:element|helper)-/, ''));
const name = isCropperJS ? 'Cropper' : normalizeGlobalName(pkg.name);
const banner = createBanner({
  data: {
    name: isCropperJS ? 'Cropper.js' : name,
    year: '2015-present',
  },
  template: 'inline',
});
const formats = ['esm', 'umd'];
const modes = ['development', 'production'];
const external = isCropperJS ? [] : Object.keys(pkg.dependencies || {});
const globals = isCropperJS ? [] : external.reduce((map, key) => {
  map[key] = normalizeGlobalName(key);
  return map;
}, {});

export default formats.map((format) => ({
  external,
  input: 'src/index.ts',
  output: modes.map((mode) => ({
    name,
    format,
    globals,
    banner: isCropperJS ? banner : undefined,
    file: (format === 'esm' ? pkg.module : pkg.main).replace('.js', `${mode === 'production' ? '.min' : ''}.js`),
    plugins: mode === 'production' ? [terser()] : [],
  })),
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(config.compilerOptions),
    replace({
      __VERSION__: pkg.version,
    }),
  ].concat(format === 'umd' ? [] : copy({
    copyOnce: true,
    targets: [
      {
        src: 'src/index.d.ts',
        dest: 'dist',
        rename: pkg.types.replace('dist/', ''),
      },
    ],
  })),
}));
