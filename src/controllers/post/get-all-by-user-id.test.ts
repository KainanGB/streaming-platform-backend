import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createPost } from '@/utils/tests/create-post'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] get all posts by user id', () => {
  it('should be able to get all user posts', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app)
    await createPost(app, authResponseData.accessToken, authResponseData.refreshToken.userId)

    await createPost(app, authResponseData.accessToken, authResponseData.refreshToken.userId)

    const { body, statusCode } = await request(app)
      .get(`/posts/${authResponseData.refreshToken.userId}`)
      .set('Authorization', authResponseData.accessToken)
      .send()

    const { posts } = body

    expect(statusCode).toEqual(200)
    expect(posts).toHaveLength(2)
  })
})
