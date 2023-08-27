import { InMemoryPostRepository } from '@/repositories/in-memory-repository/in-memory-post-repository'
import { beforeEach, expect, it } from 'vitest'
import { GetAllPostsUseCase } from './get-all-posts-use-case'

let postsRepository: InMemoryPostRepository
let getAllPostsUseCase: GetAllPostsUseCase

beforeEach(() => {
  postsRepository = new InMemoryPostRepository()
  getAllPostsUseCase = new GetAllPostsUseCase(postsRepository)
})

it('should be able to get all posts', async () => {
  const newPost = {
    id: 'teste-id',
    title: 'novo post',
    body: 'texto post',
    upvotes: 1,
    downvotes: 0,
    created_at: new Date(),
    updated_at: new Date(),
    author: 'fulano',
    authorId: 'fulano-id',
    _count: {
      comments: 1
    }
  }
  postsRepository.posts.push(newPost)
  postsRepository.posts.push(newPost)

  const { posts } = await getAllPostsUseCase.execute()

  expect(posts).toHaveLength(2)
  expect(posts[0]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      upvotes: expect.any(Number),
      downvotes: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      author: expect.any(String),
      authorId: expect.any(String),
      _count: {
        comments: expect.any(Number)
      }
    })
  )
})
it('should get all posts return with empty array', async () => {
  const { posts } = await getAllPostsUseCase.execute()

  expect(posts).toStrictEqual([])
})
