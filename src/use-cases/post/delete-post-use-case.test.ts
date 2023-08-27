import { InMemoryPostRepository } from '@/repositories/in-memory-repository/in-memory-post-repository'
import { beforeEach, expect, it } from 'vitest'
import { DeletePostUseCase } from './delete-post-use-case.ts'

let postsRepository: InMemoryPostRepository
let deletePostUseCase: DeletePostUseCase

beforeEach(() => {
  postsRepository = new InMemoryPostRepository()
  deletePostUseCase = new DeletePostUseCase(postsRepository)
})

it('should be able to delete a post if is the author', async () => {
  const post = {
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

  postsRepository.posts.push(post)

  await expect(deletePostUseCase.execute(post.id, post.authorId)).resolves.not.toThrow()
})

it('should not be able to delete a post if not the author', async () => {
  const post = {
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

  postsRepository.posts.push(post)

  await expect(deletePostUseCase.execute(post.id, 'wrong-author')).rejects.toThrow()
})
