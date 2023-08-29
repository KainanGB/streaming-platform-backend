import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Refresh Controller', () => {
  it('should correctly refresh token', async () => {
    const { authResponseData, statusCode } = await createAndAuthenticateUser(app)

    const newToken = await request(app).post('/refresh').send({
      token: authResponseData.refreshToken.id
    })

    expect(statusCode).toEqual(200)
    expect(newToken.body).toEqual(
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
