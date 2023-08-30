import { ResourceNotFound } from '@/errors/resource-not-found'
import { UsersPostRepository } from '@/repositories/post-repository'

export class DeletePostUseCase {
  constructor(private deletePostUseCase: UsersPostRepository) {}

  async execute(id: string, userId: string) {
    const post = await this.deletePostUseCase.delete(id, userId)

    if (!post) {
      throw new ResourceNotFound('post delete')
    }

    return { post }
  }
}
