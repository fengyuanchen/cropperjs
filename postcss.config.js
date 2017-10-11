const rollupConfig = require('./rollup.config');

module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-url': {
      url: 'inline',
    },
    'postcss-header': {
      header: rollupConfig.banner,
    },
    stylefmt: {},
  },
};
