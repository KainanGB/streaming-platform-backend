import { InMemoryPostRepository } from '@/repositories/in-memory-repository/in-memory-post-repository'
import { beforeEach, expect, it } from 'vitest'
import { GetAllPostsByUserIdUseCase } from './get-all-posts-by-user-id-use-case'

let postsRepository: InMemoryPostRepository
let getAllPostsByUserIdUseCase: GetAllPostsByUserIdUseCase

beforeEach(() => {
  postsRepository = new InMemoryPostRepository()
  getAllPostsByUserIdUseCase = new GetAllPostsByUserIdUseCase(postsRepository)
})

it('should be able to get all user posts', async () => {
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

  const { posts } = await getAllPostsByUserIdUseCase.execute('fulano-id')

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

it('should get all user posts return with empty array', async () => {
  const { posts } = await getAllPostsByUserIdUseCase.execute('fulano-id')

  expect(posts).toStrictEqual([])
})
