import { PostPrismaRepository } from '@/repositories/implementations/post-prisma-repository'
import { GetAllPostsUseCase } from '@/use-cases/post/get-all-posts-use-case'
import { GetAllPostController } from '../get-all'

export function getAllPostControllerFactory() {
  const postPrismaRepository = new PostPrismaRepository()
  const getAllPostUseCase = new GetAllPostsUseCase(postPrismaRepository)

  const getAllPostController = new GetAllPostController(getAllPostUseCase)

  return getAllPostController
}
