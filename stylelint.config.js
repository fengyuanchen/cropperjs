module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
  },
};
