import { ResourceNotFound } from '@/errors/resource-not-found'
import { UsersRepository } from '@/repositories/users-repository'

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new ResourceNotFound('find user by id')
    }
    return user
  }
}
