module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testMatch: [
    '**/packages/*/tests/**/*.spec.ts',
  ],
};
