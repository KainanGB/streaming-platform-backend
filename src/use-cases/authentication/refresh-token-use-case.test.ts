import { expect, it } from 'vitest'
import { InMemoryAuthRepository } from '@/repositories/in-memory-repository/in-memory-auth-repository'
import { FindRefreshTokenByIdUseCase } from './find-refresh-token-by-id-use-case'
import { RefreshTokenUseCase } from './refresh-token-use-case'
import { GenerateRefreshToken } from '@/providers/generateRefreshToken'
import { GenerateAccessToken } from '@/providers/generateAccessToken'
import { DeleteRefreshTokenUseCase } from './delete-refresh-token-use-case'

it('should correctly refresh token', async () => {
  const authRepository = new InMemoryAuthRepository()
  const generateRefreshToken = new GenerateRefreshToken(authRepository)
  const generateAcessToken = new GenerateAccessToken()
  const findRefreshTokenById = new FindRefreshTokenByIdUseCase(authRepository)
  const deleteRefreshToken = new DeleteRefreshTokenUseCase(authRepository)
  const refreshTokenUseCase = new RefreshTokenUseCase(
    generateRefreshToken,
    generateAcessToken,
    findRefreshTokenById,
    deleteRefreshToken
  )
  const userId = 'teste'
  const refreshToken = await generateRefreshToken.execute(userId)

  await expect(refreshTokenUseCase.execute(refreshToken.id)).resolves.not.toThrow()
})

it('should throw error if refresh token is invalid', async () => {
  const authRepository = new InMemoryAuthRepository()
  const generateRefreshToken = new GenerateRefreshToken(authRepository)
  const generateAcessToken = new GenerateAccessToken()
  const findRefreshTokenById = new FindRefreshTokenByIdUseCase(authRepository)
  const deleteRefreshToken = new DeleteRefreshTokenUseCase(authRepository)
  const refreshTokenUseCase = new RefreshTokenUseCase(
    generateRefreshToken,
    generateAcessToken,
    findRefreshTokenById,
    deleteRefreshToken
  )
  const userId = 'teste'

  await generateRefreshToken.execute(userId)

  await expect(refreshTokenUseCase.execute('refreshToken.id')).rejects.toThrow()
})
