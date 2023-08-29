import { PostPrismaRepository } from '@/repositories/implementations/post-prisma-repository'
import { DeletePostUseCase } from '@/use-cases/post/delete-post-use-case.ts'
import { DeletePostController } from '../delete'

export function deletePostControllerFactory() {
  const postPrismaRepository = new PostPrismaRepository()
  const deletePostUseCase = new DeletePostUseCase(postPrismaRepository)

  const deleteController = new DeletePostController(deletePostUseCase)

  return deleteController
}
