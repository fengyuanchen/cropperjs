module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  moduleNameMapper: {
    '^@cropper/(.*?)$': '<rootDir>/packages/$1/src',
    cropperjs: '<rootDir>/packages/cropperjs/src',
  },
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testMatch: [
    '**/packages/*/tests/**/*.spec.ts',
  ],
};
