import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { IUser } from '@/@types/user'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: IUser) {
    const user = await prisma.user.create({
      data: {
        ...data
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        refresh_token: true,
        Subscription: true
      }
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        refresh_token: true,
        Subscription: true
      }
    })
    if (!user) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user
    return userData
  }

  async delete(id: string) {
    await prisma.user.deleteMany({
      where: { id }
    })
  }

  async edit(data: Omit<IUser, 'password'>, id: string) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...data
      }
    })
    return user
  }

  async getAll() {
    const user = await prisma.user.findMany()
    return user
  }
}
