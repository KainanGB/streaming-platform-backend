import { AuthUserRepository } from '@/repositories/implementations/auth-prisma-repository'

export class DeleteRefreshTokenUseCase {
  constructor(private authenticationRepository: AuthUserRepository) {}

  async execute(userId: string) {
    await this.authenticationRepository.deleteToken(userId)
  }
}
