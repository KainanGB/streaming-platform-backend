import { Prisma, UserRoles } from '@prisma/client'
import { AuthRepository } from '../auth-repository'

const userWithRefreshToken = Prisma.validator<Prisma.UserArgs>()({
  include: { refresh_token: true }
})
type UserWithRefreshToken = Prisma.UserGetPayload<typeof userWithRefreshToken>

export class InMemoryAuthRepository implements AuthRepository {
  public users: UserWithRefreshToken[] = []

  async refresh(userId: string, expiresIn: number) {
    const refreshToken = {
      id: 'teste-id',
      expiresIn,
      userId
    }
    const user = {
      id: 'teste-id',
      username: 'username',
      email: 'email.teste@test.com',
      password: 'test-password',
      created_at: new Date(),
      updated_at: new Date(),
      role: 'MEMBER' as UserRoles,
      refresh_token: refreshToken
    }

    this.users.push(user)

    return refreshToken
  }
  async findTokenById(id: string) {
    const user = this.users.find((item) => item.refresh_token?.id === id)

    if (!user) {
      throw new Error('refresh token invalid')
    }

    return user.refresh_token
  }

  async deleteToken(id: string) {
    const user = this.users.find((item) => item.refresh_token?.userId === id)

    if (!user) {
      throw new Error('user does not exists')
    }

    this.users.filter((user) => user.refresh_token?.userId !== id)
  }
}
