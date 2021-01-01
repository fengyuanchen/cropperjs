module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
    'order/properties-alphabetical-order': true,
  },
};
