import fs from 'fs';
import changeCase from 'change-case';
import createBanner from 'create-banner';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-inline-postcss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import config from './tsconfig.json';

const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));
const isCropperJS = pkg.name === 'cropperjs';
const normalizeGlobalName = (name) => changeCase.pascalCase(name.replace(/[a-z]+-/, ''));
const name = isCropperJS ? 'Cropper' : normalizeGlobalName(pkg.name);
const banner = createBanner({
  data: {
    name: isCropperJS ? 'Cropper.js' : name,
    year: '2015-present',
  },
  template: 'inline',
});
const bundles = ['unbundled', 'bundled'];
const formats = ['esm', 'umd'];
const modes = ['development', 'production'];
const external = Object.keys(pkg.dependencies || {});
const globals = external.reduce((map, key) => {
  map[key] = normalizeGlobalName(key);
  return map;
}, {});

export default bundles.reduce((configs, bundle) => {
  const isBundled = bundle === 'bundled';

  return configs.concat(formats.map((format) => {
    const isESM = format === 'esm';

    return {
      input: 'src/index.ts',
      output: modes.reduce((outputs, mode) => {
        const isProduction = mode === 'production';

        return outputs.concat(!isBundled && isProduction ? [] : {
          format,
          name: isESM ? undefined : name,
          banner: isCropperJS ? banner : undefined,
          globals: isBundled ? undefined : globals,
          file: (isESM ? pkg.module : pkg.main)
            .replace('.raw', isBundled ? '' : '.raw')
            .replace('.js', `${isProduction ? '.min' : ''}.js`),
          plugins: isProduction ? [terser()] : undefined,
        });
      }, []),
      external: isBundled ? undefined : external,
      plugins: [
        nodeResolve(),
        commonjs(),
        postcss({
          include: [/\/style\.ts$/],
          styleRegex: /(?:export default `)([^`]+)(?:`;)/g,
        }),
        typescript(config.compilerOptions),
        replace({
          __VERSION__: pkg.version,
        }),
      ],
    };
  }));
}, []);
