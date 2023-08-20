import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Get All Controller', () => {
  it('should correctly get all users', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app, true)

    const response = await request(app).get('/users').set('Authorization', authResponseData.accessToken)

    expect(response.body).toEqual(
      expect.objectContaining({
        users: [
          {
            id: expect.any(String),
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            role: expect.any(String)
          }
        ]
      })
    )
  })
})
