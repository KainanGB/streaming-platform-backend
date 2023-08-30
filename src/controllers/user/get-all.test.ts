import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Get All Controller', () => {
  it('should correctly get all users', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app, true)

    await expect(request(app).get('/users').set('Authorization', authResponseData.accessToken)).resolves.not.toThrow()
  })
})
