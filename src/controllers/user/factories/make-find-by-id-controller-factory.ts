import { PrismaUsersRepository } from '@/repositories/implementations/users-prisma-repository'
import { FindUserByIdUseCase } from '@/use-cases/users/find-by-id-user-use-case'
import { FindByIdController } from '../find-by-id'

export function findByIdControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const findUserByIdUseCase = new FindUserByIdUseCase(prismaUsersRepository)

  const findByIdController = new FindByIdController(findUserByIdUseCase)

  return findByIdController
}
