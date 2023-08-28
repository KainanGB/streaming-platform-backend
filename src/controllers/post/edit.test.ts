import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createPost } from '@/utils/tests/create-post'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Edit Post', () => {
  it('should be able to edit a post', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app)
    const { postResponseData } = await createPost(
      app,
      authResponseData.accessToken,
      authResponseData.refreshToken.userId
    )

    const { statusCode } = await request(app)
      .put(`/posts/${postResponseData.id}`)
      .set('Authorization', authResponseData.accessToken)
      .send({
        userId: postResponseData.authorId,
        title: 'test title',
        body: 'test body'
      })

    expect(statusCode).toEqual(204)
  })
})
