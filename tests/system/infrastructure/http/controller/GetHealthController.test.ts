import { describe, expect, test } from '@jest/globals'

import { server } from '@/server'

describe("GetHealthController", () => {
  test('it should return 200', async () => {
    const res = await server.inject().get('/v1/health')

    expect(res.statusCode).toBe(200)
    expect(res.payload).toBe("{\"data\":\"!! _+_ HEALTH ENDPOINT _+_ !!\"}")
  })
})