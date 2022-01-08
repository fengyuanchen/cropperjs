module.exports = {
  extends: [
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/properties-alphabetical-order': true,
  },
};
