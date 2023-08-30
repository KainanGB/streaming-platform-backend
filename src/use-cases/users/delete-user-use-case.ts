import { ResourceNotFound } from '@/errors/resource-not-found'
import { UsersRepository } from '@/repositories/users-repository'
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(id: string) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ResourceNotFound('delete user')
    }

    await this.usersRepository.delete(id)
  }
}
