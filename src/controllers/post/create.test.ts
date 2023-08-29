import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createPost } from '@/utils/tests/create-post'
import { describe, expect, it } from 'vitest'

describe('[E2E] Create Post', () => {
  it('should correctly create a post', async () => {
    const { authResponseData } = await createAndAuthenticateUser(app)

    const { postResponseData, statusCode } = await createPost(app, authResponseData.accessToken)

    expect(statusCode).toEqual(202)
    expect(postResponseData.title).toEqual('novo post')
    expect(postResponseData.body).toEqual('texto post')
  })
})
