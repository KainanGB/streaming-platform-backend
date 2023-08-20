import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Edit Controller', () => {
  it('should correctly edit an user', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app, false)

    const response = await request(app)
      .put(`/users/${authResponseData.refreshToken.userId}`)
      .set('Authorization', authResponseData.accessToken)
      .send({
        username: 'novo fulano',
        email: 'novo.fulano@email.com'
      })

    expect(response.statusCode).toEqual(202)
  })
})
