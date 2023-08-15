import { IUser } from '@/@types/user'
import { UsersRepository } from '@/repositories/users-repository'

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: Omit<IUser, 'password'>, id: string) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new Error('user does not exists')
    }

    await this.usersRepository.edit(data, id)
  }
}
