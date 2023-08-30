import { IUser } from '@/@types/user'
import { UserCustomResponse, UsersRepository } from '../users-repository'
import { Roles, SubscriptionStatus } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
  public users: UserCustomResponse[] = []
  async create(data: IUser) {
    const refreshToken = {
      id: 'abcasdds',
      expiresIn: 20,
      userId: 'teste-id'
    }

    const subscription = {
      id: 'teste-id',
      startDate: new Date(),
      endDate: new Date(),
      isActive: 'INACTIVE' as SubscriptionStatus,
      userId: 'teste-id'
    }

    const user = {
      id: 'teste-id',
      username: data.username!,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
      role: 'MEMBER' as Roles,
      refresh_token: refreshToken,
      subscription: subscription
    }

    this.users.push(user)

    return user
  }
  async findByEmail(email: string) {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    const newUser = {
      ...user,
      password: 'dabv'
    }

    return newUser
  }
  async findById(id: string) {
    const user = this.users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    const user = this.users.find((item) => item.id === id)

    if (!user) {
      throw new Error('user does not exists')
    }

    this.users.filter((user) => user.id !== id)
  }

  async edit(data: Omit<IUser, 'password'>, id: string) {
    const user = this.users.find((item) => item.id === id)
    const userIndex = this.users.findIndex((item) => item.id === id)

    if (!user) {
      return null
    }
    const postEditedUser = {
      ...user,
      ...data,
      password: 'abc'
    }

    this.users[userIndex] = postEditedUser

    return postEditedUser
  }

  async getAll() {
    return this.users
  }
}
