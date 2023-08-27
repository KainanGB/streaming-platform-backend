import { PostPrismaRepository } from '@/repositories/post-prisma-repository'
import { Prisma } from '@prisma/client'

export class CreatePostUseCase {
  constructor(private createUseCase: PostPrismaRepository) {}

  async execute(data: Prisma.PostUncheckedCreateInput) {
    const post = await this.createUseCase.create(data)

    if (!post) {
      throw new Error('Something went wrong while creating your post')
    }

    return { post }
  }
}
