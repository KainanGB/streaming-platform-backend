import { AuthUserRepository } from '@/repositories/auth-prisma-repository'

export class FindRefreshTokenByIdUseCase {
  constructor(private authenticationRepository: AuthUserRepository) {}

  async execute(tokenId: string) {
    const refreshToken = await this.authenticationRepository.findTokenById(tokenId)

    if (!refreshToken) {
      throw new Error('refresh token invalid')
    }

    return { refreshToken }
  }
}
