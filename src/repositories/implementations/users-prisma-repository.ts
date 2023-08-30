import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { IUser } from '@/@types/user'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: IUser) {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        refresh_token: true,
        username: true,
        created_at: true,
        subscription: true,
        updated_at: true,
        role: true
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        refresh_token: true,
        username: true,
        created_at: true,
        subscription: true,
        updated_at: true,
        role: true,
        password: true
      }
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        refresh_token: true,
        username: true,
        created_at: true,
        subscription: true,
        updated_at: true,
        role: true
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    await prisma.user.deleteMany({
      where: { id }
    })
  }

  async edit(data: Omit<IUser, 'password'>, id: string) {
    const user = await prisma.user.update({
      where: { id },
      data
    })
    return user
  }

  async getAll() {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        refresh_token: true,
        username: true,
        created_at: true,
        subscription: true,
        updated_at: true,
        role: true
      }
    })
    return user
  }
}
