import { describe, expect, test } from '@jest/globals'
import { FastJWTProvider } from '@/shared/infrastructure/security/FastJWTProvider'
import { ExpiredJWTToken } from '@/shared/domain/security/ExpiredJWTToken'
import { InvalidJWTToken } from '@/shared/domain/security/InvalidJWTToken'

describe('FastJWTProvider', () => {
    const jwtProvider = new FastJWTProvider('test')
    const testsPayload = { 'data': 'random', 'iat': 1656371707, 'exp': 9696979390 }
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmFuZG9tIiwiaWF0IjoxNjU2MjY1NjA3LCJleHAiOjE2NTYyNjY1MDd9.VgjRATq2pdZ0FYWq8yVluHwSpJqHkLsXc2yPmK3xTxg'
    const invalidToken = 'invalid token!'

    test('it should throw expired token when decode token', async () => {
        await expect(() => jwtProvider.decode(expiredToken)).toThrowError(ExpiredJWTToken)
        await expect(() => jwtProvider.decode(expiredToken)).toThrow('Expired JWT token provided')
    })

    test('it should throw invalid token when decode token', async () => {
        await expect(() => jwtProvider.decode(invalidToken)).toThrowError(InvalidJWTToken)
        await expect(() => jwtProvider.decode(invalidToken)).toThrow('Invalid JWT token provided')
    })

    test('it should decode a token', async () => {
        const token = jwtProvider.encode(testsPayload)
        const payload = jwtProvider.decode(token)

        expect(payload).toBeDefined()
        expect(payload).toMatchObject(testsPayload)
    })

    test('it should encode payload', async () => {
        const token = jwtProvider.encode(testsPayload)

        expect(token).toBeDefined()
        expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })
})