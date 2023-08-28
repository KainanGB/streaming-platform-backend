import { ObjectId } from 'mongodb'
import { Post } from '@prisma/client'
import { Express } from 'express'
import request from 'supertest'

export async function createPost(
  app: Express,
  accessToken: string,
  receivedAuthorId?: string
): Promise<{
  postResponseData: Post
  statusCode: number
}> {
  const authorId = receivedAuthorId ? receivedAuthorId : new ObjectId()
  const post = {
    title: 'novo post',
    body: 'texto post',
    authorId
  }

  const postResponse = await request(app).post('/posts').set('Authorization', accessToken).send(post)

  const postResponseData = postResponse.body

  return {
    postResponseData: postResponseData.post,
    statusCode: postResponse.statusCode
  }
}
