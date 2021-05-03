module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['/^deep|slotted|global$/'],
    }],
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['/^v-(?:deep|slotted|global)$/'],
    }],
    'no-descending-specificity': null,
    'no-empty-source': null,
    'order/properties-alphabetical-order': true,
    'selector-type-no-unknown': null,
  },
};
