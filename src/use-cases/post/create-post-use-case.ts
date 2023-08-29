import { UsersPostRepository } from '@/repositories/post-repository'
import { Prisma } from '@prisma/client'

export class CreatePostUseCase {
  constructor(private createUseCase: UsersPostRepository) {}

  async execute(data: Prisma.PostUncheckedCreateInput) {
    const post = await this.createUseCase.create(data)

    if (!post) {
      throw new Error('Something went wrong while creating your post')
    }

    return { post }
  }
}
