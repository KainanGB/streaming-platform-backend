import { ResourceNotFound } from '@/errors/resource-not-found'
import { IUpdatePost, UsersPostRepository } from '@/repositories/post-repository'

export class EditPostUseCase {
  constructor(private editPostUseCase: UsersPostRepository) {}

  async execute(postId: string, userId: string, data: IUpdatePost) {
    const post = await this.editPostUseCase.edit(postId, userId, data)

    if (!post) {
      throw new ResourceNotFound('edit post')
    }

    return { post }
  }
}
