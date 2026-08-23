module.exports = {
  'pre-commit': 'npx lint-staged',
  'commit-msg': 'npx commitlint --edit $1',
};
