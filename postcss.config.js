const rollupConfig = require('./rollup.config');

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'postcss-url': {
      url: 'inline',
    },
    'postcss-header': {
      header: rollupConfig.output[0].banner,
    },
    stylefmt: {},
  },
};
