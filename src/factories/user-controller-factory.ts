import { UsersController } from '@/controllers/users-controllers/users-controller'
import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { FindByEmailUseCase } from '@/use-cases/users/find-by-email-user-use-case'
import { FindUserByIdUseCase } from '@/use-cases/users/find-by-id-user-use-case'
import { GetAllUseCase } from '@/use-cases/users/get-all-user-use-case'
import { RegisterUseCase } from '@/use-cases/users/register-user-use-case'

export function userControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getAllUseCase = new GetAllUseCase(prismaUsersRepository)
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)
  const findByEmailUseCase = new FindByEmailUseCase(prismaUsersRepository)
  const findUserByIdUseCase = new FindUserByIdUseCase(prismaUsersRepository)
  const editUserUseCase = new EditUserUseCase(prismaUsersRepository)
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

  const usersController = new UsersController(
    registerUseCase,
    getAllUseCase,
    findByEmailUseCase,
    findUserByIdUseCase,
    deleteUserUseCase,
    editUserUseCase
  )

  return usersController
}
