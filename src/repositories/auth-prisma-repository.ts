import { prisma } from '@/lib/prisma'
import { AuthRepository } from './auth-repository'

export class AuthUserRepository implements AuthRepository {
  async refresh(userId: string, expiresIn: number) {
    const user = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
    return user
  }

  async findTokenById(id: string) {
    const user = await prisma.refreshToken.findFirst({
      where: {
        id
      }
    })
    return user
  }

  async deleteToken(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        userId
      }
    })
  }
}
