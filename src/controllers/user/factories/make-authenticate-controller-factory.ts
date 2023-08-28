import { AuthenticateController } from '@/controllers/authentication/authenticate'
import { GenerateAccessToken } from '@/providers/generate-access-token'
import { GenerateRefreshToken } from '@/providers/generate-refresh-token'
import { AuthUserRepository } from '@/repositories/implementations/auth-prisma-repository'

import { PrismaUsersRepository } from '@/repositories/implementations/users-prisma-repository'
import { AuthenticateUseCase } from '@/use-cases/authentication/auth-use-case'
import { DeleteRefreshTokenUseCase } from '@/use-cases/authentication/delete-refresh-token-use-case'

export function authenticateControllerFactory() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authUserRepository = new AuthUserRepository()
  const generateAcessToken = new GenerateAccessToken()

  const authenticate = new AuthenticateUseCase(prismaUsersRepository)
  const generateRefreshToken = new GenerateRefreshToken(authUserRepository)
  const deleteToken = new DeleteRefreshTokenUseCase(authUserRepository)

  const authenticateController = new AuthenticateController(
    authenticate,
    generateAcessToken,
    generateRefreshToken,
    deleteToken
  )

  return authenticateController
}
