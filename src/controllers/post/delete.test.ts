import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createPost } from '@/utils/tests/create-post'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('[E2E] Delete Post', () => {
  it('should be able to delete a post', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app)
    const { postResponseData } = await createPost(app, authResponseData.accessToken)

    const { statusCode } = await request(app)
      .delete(`/posts/${postResponseData.id}`)
      .set('Authorization', authResponseData.accessToken)
      .send({
        userId: postResponseData.authorId
      })

    expect(statusCode).toEqual(204)
  })
})
