import { ResourceNotFound } from '@/errors/resource-not-found'
import { UsersPostRepository } from '@/repositories/post-repository'
import { Prisma } from '@prisma/client'

export class CreatePostUseCase {
  constructor(private createUseCase: UsersPostRepository) {}

  async execute(data: Prisma.PostUncheckedCreateInput) {
    const post = await this.createUseCase.create(data)

    if (!post) {
      throw new ResourceNotFound('create post')
    }

    return { post }
  }
}
