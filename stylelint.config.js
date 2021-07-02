module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
    'order/properties-alphabetical-order': true,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['/^deep|slotted|global$/'],
    }],
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['/^v-(?:deep|slotted|global)$/'],
    }],
    'selector-type-no-unknown': null,
  },
};
