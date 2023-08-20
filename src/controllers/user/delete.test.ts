import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Delete Controller', () => {
  it('should correctly delete user', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app, true)

    const response = await request(app)
      .delete(`/users/${authResponseData.refreshToken.userId}`)
      .set('Authorization', authResponseData.accessToken)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
