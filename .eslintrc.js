module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
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
      files: 'docs/.vuepress/**/*.js',
      rules: {
        'global-require': 'off',
      },
    },
  ],
};
