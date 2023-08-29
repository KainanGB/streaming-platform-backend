import { PostPrismaRepository } from '@/repositories/implementations/post-prisma-repository'
import { CreatePostController } from './../create'
import { CreatePostUseCase } from '@/use-cases/post/create-post-use-case'

export function createPostControllerFactory() {
  const postPrismaRepository = new PostPrismaRepository()
  const createPostUseCase = new CreatePostUseCase(postPrismaRepository)

  const createController = new CreatePostController(createPostUseCase)

  return createController
}
