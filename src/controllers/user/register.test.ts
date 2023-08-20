import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { describe, expect, it } from 'vitest'

describe('[E2E] Register Controller', () => {
  it('should correctly register an user', async () => {
    const { statusCode } = await createAndAuthenticateUser(app, false)

    expect(statusCode).toEqual(200)
  })
})
