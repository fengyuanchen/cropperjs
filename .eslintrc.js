module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsdoc',
    'vue',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': ['error', 100, 2, {
      ignorePattern: '\\S+="[^"]*"',
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'no-param-reassign': 'off',
  },
  overrides: [
    {
      files: 'packages/**/tests/**/*.ts',
      env: {
        jest: true,
      },
      rules: {
        'no-new': 'off',
      },
    },
    {
      files: 'docs/.vitepress/**/*.vue',
      rules: {
        'import/no-unresolved': 'off',
        'no-new': 'off',
      },
    },
  ],
};
