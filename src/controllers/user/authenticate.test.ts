import { app } from '@/app'

import { describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('[E2E] Authenticate Controller', () => {
  it('should correctly authenticate', async () => {
    const { statusCode, authResponseData } = await createAndAuthenticateUser(app)

    expect(statusCode).toEqual(200)
    expect(authResponseData).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: {
          id: expect.any(String),
          expiresIn: expect.any(Number),
          userId: expect.any(String)
        }
      })
    )
  })
})
