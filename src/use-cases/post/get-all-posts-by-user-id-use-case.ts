import { UsersPostRepository } from '@/repositories/post-repository'

export class GetAllPostsByUserIdUseCase {
  constructor(private getAllPostsByUserIdUseCase: UsersPostRepository) {}

  async execute(userId: string) {
    const posts = await this.getAllPostsByUserIdUseCase.getAllPostsByUserId(userId)

    return { posts }
  }
}
