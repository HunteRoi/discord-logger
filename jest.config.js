/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'docs/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
};
