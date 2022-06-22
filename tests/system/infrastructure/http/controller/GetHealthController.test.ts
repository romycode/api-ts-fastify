import { describe, expect, test } from '@jest/globals'

import { app } from '@/app'

describe("GetHealthController", () => {
  test('it should return 200', async () => {
    const res = await app.inject().get('/health')

    expect(res.statusCode).toBe(200)
    expect(res.payload).toBe("{\"data\":\"!! _+_ HEALTH ENDPOINT _+_ !!\"}")
  })
})