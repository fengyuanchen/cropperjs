module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb-typescript/base',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
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
