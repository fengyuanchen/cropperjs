const puppeteer = require('puppeteer');
const rollupConfig = require('../rollup.config');

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = (config) => {
  config.set({
    autoWatch: false,
    basePath: '..',
    browsers: ['ChromeHeadlessWithoutSandbox'],
    client: {
      mocha: {
        timeout: 10000,
      },
    },
    customLaunchers: {
      ChromeHeadlessWithoutSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    files: [
      'dist/cropper.js',
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
      'test/helpers.js': ['rollup'],
      'test/specs/**/*.spec.js': ['rollup'],
    },
    reporters: ['mocha'],
    rollupPreprocessor: {
      plugins: rollupConfig.plugins,
      output: {
        format: 'iife',
      },
    },
    singleRun: true,
  });
};
