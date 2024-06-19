/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'docs/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(mt|t|cj|j)s$": [
      "ts-jest",
      {
        useESM: true
      }
    ]
  },
};
