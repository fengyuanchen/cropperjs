module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': true,
  },
};
