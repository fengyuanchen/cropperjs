const rollupConfig = require('./rollup.config');

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    'postcss-url': {
      url: 'inline',
    },
    'postcss-header': {
      header: rollupConfig.output[0].banner,
    },
    stylelint: {
      fix: true,
    },
  },
};
