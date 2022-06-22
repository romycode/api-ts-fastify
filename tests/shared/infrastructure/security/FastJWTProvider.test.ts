import {describe, expect, test} from '@jest/globals'
import {FastJWTProvider} from '@/shared/infrastructure/security/FastJWTProvider'
import {TokenError} from "fast-jwt";

describe('FastJWTProvider', () => {
    const jwtProvider = new FastJWTProvider('test')
    const testsPayload = {'data': 'random', 'iat': 1656371707, 'exp': 9696979390}
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmFuZG9tIiwiaWF0IjoxNjU2MjY1NjA3LCJleHAiOjE2NTYyNjY1MDd9.VgjRATq2pdZ0FYWq8yVluHwSpJqHkLsXc2yPmK3xTxg'
    const invalidToken = 'invalid token!'

    test('it should throw expired token when decode token', async () => {
        await expect(() => jwtProvider.decode(expiredToken)).toThrowError(TokenError)
        await expect(() => jwtProvider.decode(expiredToken)).toThrow('The token has expired at 2022-06-26T18:01:47.000Z.')
    })

    test('it should throw invalid token when decode token', async () => {
        await expect(() => jwtProvider.decode(invalidToken)).toThrowError(TokenError)
        await expect(() => jwtProvider.decode(invalidToken)).toThrow('The token is malformed.')
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