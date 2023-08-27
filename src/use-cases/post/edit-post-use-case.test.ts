import { InMemoryPostRepository } from '@/repositories/in-memory-repository/in-memory-post-repository'
import { beforeEach, expect, it } from 'vitest'
import { EditPostUseCase } from './edit-post-use-case'

let postsRepository: InMemoryPostRepository
let editPostUseCase: EditPostUseCase

beforeEach(() => {
  postsRepository = new InMemoryPostRepository()
  editPostUseCase = new EditPostUseCase(postsRepository)
})

it('should be able to edit a post if is the author', async () => {
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

  const editPostPayload = {
    title: 'post',
    body: 'post',
    upvotes: 1,
    downvotes: 1
  }

  const { post: editedPost } = await editPostUseCase.execute(newPost.id, newPost.authorId, editPostPayload)

  expect(editedPost.title).toEqual('post')
  expect(editedPost.body).toEqual('post')
  expect(editedPost.upvotes).toEqual(1)
  expect(editedPost.downvotes).toEqual(1)
})
it('should not be able to edit a post if is not the author', async () => {
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

  const editPostPayload = {
    title: 'post',
    body: 'post',
    upvotes: 1,
    downvotes: 1
  }

  await expect(editPostUseCase.execute(newPost.id, 'wrong-user-id', editPostPayload)).rejects.toThrow()
})
