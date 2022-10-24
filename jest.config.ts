import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  silent: true,
  preset: 'ts-jest',
  moduleDirectories: ['src', 'node_modules'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  testRegex: '(.*\\.spec\\.ts|.*\\.e2e-spec\\.ts)$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/*.(t|j)s'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
};

export default config;