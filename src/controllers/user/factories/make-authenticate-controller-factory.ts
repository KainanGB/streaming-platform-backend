import { AuthenticateController } from '@/controllers/user/authenticate'
import { GenerateAccessToken } from '@/providers/generateAccessToken'
import { GenerateRefreshToken } from '@/providers/generateRefreshToken'
import { AuthUserRepository } from '@/repositories/auth-prisma-repository'

import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { AuthenticateUseCase } from '@/use-cases/authentication/auth-use-case'
import { DeleteRefreshTokenUseCase } from '@/use-cases/authentication/delete-refresh-token-use-case'

export function authenticateControllerFactory() {
  const authUserRepository = new AuthUserRepository()
  const generateRefreshToken = new GenerateRefreshToken(authUserRepository)
  const generateAcessToken = new GenerateAccessToken()
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticate = new AuthenticateUseCase(prismaUsersRepository)

  const deleteToken = new DeleteRefreshTokenUseCase(authUserRepository)

  const authenticateController = new AuthenticateController(
    authenticate,
    generateAcessToken,
    generateRefreshToken,
    deleteToken
  )

  return authenticateController
}
