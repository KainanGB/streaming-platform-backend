import { PostPrismaRepository } from '@/repositories/implementations/post-prisma-repository'
import { EditPostUseCase } from '@/use-cases/post/edit-post-use-case'
import { EditPostController } from '../edit'

export function editPostControllerFactory() {
  const postPrismaRepository = new PostPrismaRepository()
  const editPostUseCase = new EditPostUseCase(postPrismaRepository)

  const editController = new EditPostController(editPostUseCase)

  return editController
}
