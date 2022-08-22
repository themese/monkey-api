const tsconfig = require('./tsconfig');
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
  roots: [
    "<rootDir>"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx)",
    "**/?(*.)+(spec|test).+(ts|tsx)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    '<rootDir>/(node_modules)/',
  ],
  moduleNameMapper: moduleNameMapper,
};