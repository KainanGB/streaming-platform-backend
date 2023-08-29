import { PrismaUsersRepository } from '@/repositories/implementations/users-prisma-repository'
import { GetAllUseCase } from '@/use-cases/users/get-all-user-use-case'
import { GetAllController } from '../get-all'

export function getAllControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getAllUseCase = new GetAllUseCase(prismaUsersRepository)

  const getAllController = new GetAllController(getAllUseCase)

  return getAllController
}
