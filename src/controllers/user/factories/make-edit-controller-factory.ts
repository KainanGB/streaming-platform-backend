import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { EditController } from '../edit'

export function editControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const editUserUseCase = new EditUserUseCase(prismaUsersRepository)

  const editController = new EditController(editUserUseCase)

  return editController
}
