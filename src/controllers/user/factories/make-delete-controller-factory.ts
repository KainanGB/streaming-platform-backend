import { PrismaUsersRepository } from '@/repositories/implementations/users-prisma-repository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'
import { DeleteController } from '../delete'

export function deleteControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

  const deleteController = new DeleteController(deleteUserUseCase)

  return deleteController
}
