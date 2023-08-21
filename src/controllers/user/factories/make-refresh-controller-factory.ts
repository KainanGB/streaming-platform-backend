import { FindRefreshTokenByIdUseCase } from '../../../use-cases/authentication/find-refresh-token-by-id-use-case'
import { RefreshController } from '@/controllers/user/refresh'
import { GenerateAccessToken } from '@/providers/generate-access-token'
import { GenerateRefreshToken } from '@/providers/generate-refresh-token'
import { AuthUserRepository } from '@/repositories/auth-prisma-repository'
import { RefreshTokenUseCase } from '@/use-cases/authentication/refresh-token-use-case'
import { DeleteRefreshTokenUseCase } from '@/use-cases/authentication/delete-refresh-token-use-case'

export function refreshControllerFactory() {
  const authUserRepository = new AuthUserRepository()
  const generateRefreshToken = new GenerateRefreshToken(authUserRepository)
  const generateAcessToken = new GenerateAccessToken()

  const deleteRefreshTokenUseCase = new DeleteRefreshTokenUseCase(authUserRepository)
  const findRefreshTokenByIdUseCase = new FindRefreshTokenByIdUseCase(authUserRepository)

  const refreshTokenUseCase = new RefreshTokenUseCase(
    generateRefreshToken,
    generateAcessToken,
    findRefreshTokenByIdUseCase,
    deleteRefreshTokenUseCase
  )

  const refreshControllerFactory = new RefreshController(refreshTokenUseCase)
  return refreshControllerFactory
}
