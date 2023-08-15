import { AuthUserRepository } from '@/repositories/auth-prisma-repository'

import dayjs from 'dayjs'

export class GenerateRefreshToken {
  constructor(private client: AuthUserRepository) {}

  async execute(userId: string) {
    const expiresIn = dayjs().add(20, 'second').unix()
    const user = await this.client.refresh(userId, expiresIn)
    return user
  }
}
