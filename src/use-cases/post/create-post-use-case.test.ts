import { InMemoryPostRepository } from '@/repositories/in-memory-repository/in-memory-post-repository'
import { CreatePostUseCase } from './create-post-use-case'

import { expect, it, beforeEach } from 'vitest'

let postsRepository: InMemoryPostRepository
let createPostUseCase: CreatePostUseCase

beforeEach(() => {
  postsRepository = new InMemoryPostRepository()
  createPostUseCase = new CreatePostUseCase(postsRepository)
})

it('should be able to create a post', async () => {
  const newPost = {
    title: 'novo post',
    body: 'texto post',
    author: 'fulano',
    authorId: 'fulano-id'
  }
  const { post } = await createPostUseCase.execute(newPost)

  expect(post.authorId).toEqual(newPost.authorId)
  expect(post.author).toEqual(newPost.author)
})
