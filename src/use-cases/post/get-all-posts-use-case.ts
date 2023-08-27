import { UsersPostRepository } from '@/repositories/post-repository'

export class GetAllPostsUseCase {
  constructor(private getAllPostsUseCase: UsersPostRepository) {}

  async execute() {
    const posts = await this.getAllPostsUseCase.getAll()

    return { posts }
  }
}
