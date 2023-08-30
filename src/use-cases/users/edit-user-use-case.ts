import { IUser } from '@/@types/user'
import { ResourceNotFound } from '@/errors/resource-not-found'
import { UsersRepository } from '@/repositories/users-repository'

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: Omit<IUser, 'password'>, id: string) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ResourceNotFound('edit user')
    }

    await this.usersRepository.edit(data, id)
  }
}
