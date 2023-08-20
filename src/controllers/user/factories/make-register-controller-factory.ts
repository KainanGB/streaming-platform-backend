import { RegisterController } from './../register'
import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { RegisterUseCase } from '@/use-cases/users/register-user-use-case'

export function registerControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  const registerController = new RegisterController(registerUseCase)

  return registerController
}
