import { prisma } from '@/lib/prisma'
import { UsersRepository } from './users-repository'
import { User } from '@prisma/client'
import { IUser } from '@/@types/user'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: IUser): Promise<void> {
    await prisma.user.create({
      data: {
        ...data
      }
    })
  }
  async find(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    })
  }

  async edit(data: Omit<IUser, 'password'>, userData: User): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        id: userData.id
      },
      data: {
        ...userData,
        ...data
      }
    })
    return user
  }

  async getAll(): Promise<User[] | null> {
    const user = await prisma.user.findMany()
    return user
  }
}
