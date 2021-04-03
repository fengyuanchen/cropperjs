const puppeteer = require('puppeteer');
const rollupConfig = require('./rollup.config');

process.env.CHROME_BIN = puppeteer.executablePath();
process.env.NODE_ENV = 'test';

module.exports = (config) => {
  config.set({
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    client: {
      mocha: {
        timeout: 10000,
      },
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
    },
    files: [
      'src/index.js',
      'dist/cropper.css',
      'test/helpers.js',
      'test/specs/**/*.spec.js',
      {
        pattern: 'docs/images/*',
        included: false,
      },
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'src/index.js': ['rollup'],
      'test/helpers.js': ['rollup'],
      'test/specs/**/*.spec.js': ['rollup'],
    },
    reporters: ['mocha', 'coverage-istanbul'],
    rollupPreprocessor: {
      plugins: rollupConfig.plugins,
      output: {
        format: 'iife',
        name: 'Cropper',
        sourcemap: 'inline',
      },
    },
    singleRun: true,
  });
};
