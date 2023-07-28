import { IUser } from '@/@types/user'
import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { User } from '@prisma/client'

export class EditUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute(data: Omit<IUser, 'password'>, userData: User) {
    await this.usersRepository.edit(data, userData)
  }
}
