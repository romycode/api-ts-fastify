import { InitialOptionsTsJest } from 'ts-jest'

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1', '^@/tests/(.*)$': '<rootDir>/tests/$1' }
} as InitialOptionsTsJest