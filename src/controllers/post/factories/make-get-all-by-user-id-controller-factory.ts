import { PostPrismaRepository } from '@/repositories/implementations/post-prisma-repository'
import { GetAllPostsByUserIdUseCase } from '@/use-cases/post/get-all-posts-by-user-id-use-case'
import { GetAllPostByUserIdController } from '../get-all-by-user-id'

export function getAllPostByUserIdControllerFactory() {
  const postPrismaRepository = new PostPrismaRepository()
  const getAllPostByUserIdUseCase = new GetAllPostsByUserIdUseCase(postPrismaRepository)

  const getAllPostByUserIdController = new GetAllPostByUserIdController(getAllPostByUserIdUseCase)

  return getAllPostByUserIdController
}
