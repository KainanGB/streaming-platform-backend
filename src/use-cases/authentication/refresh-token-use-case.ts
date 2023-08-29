import { GenerateRefreshToken } from '@/providers/generate-refresh-token'
import { GenerateAccessToken } from '@/providers/generate-access-token'
import dayjs from 'dayjs'
import { FindRefreshTokenByIdUseCase } from './find-refresh-token-by-id-use-case'
import { DeleteRefreshTokenUseCase } from './delete-refresh-token-use-case'

export class RefreshTokenUseCase {
  constructor(
    private generateRefreshToken: GenerateRefreshToken,
    private generateAcessToken: GenerateAccessToken,
    private findRefreshTokenById: FindRefreshTokenByIdUseCase,
    private deleteRefreshToken: DeleteRefreshTokenUseCase
  ) {}

  async execute(tokenId: string) {
    const { refreshToken } = await this.findRefreshTokenById.execute(tokenId)

    if (!refreshToken) {
      throw new Error('invalid refresh token')
    }

    const isRefreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const accessToken = await this.generateAcessToken.execute(refreshToken.userId)

    if (isRefreshTokenExpired) {
      await this.deleteRefreshToken.execute(refreshToken.userId)
      const newRefreshToken = await this.generateRefreshToken.execute(refreshToken.userId)

      return { accessToken, refreshToken: newRefreshToken }
    }

    return { accessToken, refreshToken }
  }
}
