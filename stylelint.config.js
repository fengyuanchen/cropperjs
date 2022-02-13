module.exports = {
  extends: 'stylelint-config-standard-scss',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'color-function-notation': 'legacy',
    'order/properties-alphabetical-order': true,
  },
};
