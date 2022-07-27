import { describe, expect, test } from '@jest/globals'

import { server } from '@/server'

describe('GetWelcomeController', () => {
  test('it should return 200', async () => {
    const res = await server.inject().get('/v1/')

    expect(res.statusCode).toBe(200)
    expect(res.payload).toBe('{"data":"!! _+_ WELCOME ENDPOINT _+_ !!"}')
  })
})