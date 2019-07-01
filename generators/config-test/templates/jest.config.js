module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts?(x)'],
  setupTestFrameworkScriptFile: '<rootDir>/src/App/test/setupTests.ts',
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/App/test/mock/fileMock.ts'
  },
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['lcov', 'text-summary'],
  reporters: ['default', 'jest-junit'],
  coveragePathIgnorePatterns: ['<rootDir>/src/@codibly/autobahn/']
};
