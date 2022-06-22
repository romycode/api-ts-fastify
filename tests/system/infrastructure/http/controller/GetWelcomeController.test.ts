import { describe, expect, test } from '@jest/globals'

import { app } from '@/app'

describe('GetWelcomeController', () => {
  test('it should return 200', async () => {
    const res = await app.inject().get('/')

    expect(res.statusCode).toBe(200)
    expect(res.payload).toBe('{"data":"!! _+_ WELCOME ENDPOINT _+_ !!"}')
  })
})