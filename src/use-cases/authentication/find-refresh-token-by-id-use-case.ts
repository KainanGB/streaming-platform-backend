import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { AuthUserRepository } from '@/repositories/implementations/auth-prisma-repository'

export class FindRefreshTokenByIdUseCase {
  constructor(private authenticationRepository: AuthUserRepository) {}

  async execute(tokenId: string) {
    const refreshToken = await this.authenticationRepository.findTokenById(tokenId)

    if (!refreshToken) {
      throw new InvalidCredentialsError('find refresh token')
    }

    return { refreshToken }
  }
}
