import { ResourceNotFound } from '@/errors/resource-not-found'
import { UsersRepository } from '@/repositories/users-repository'

export class FindByEmailUseCase {
  constructor(private usersReposity: UsersRepository) {}

  async execute(email: string) {
    const user = await this.usersReposity.findByEmail(email)

    if (!user) {
      throw new ResourceNotFound('find user by email')
    }

    return user
  }
}
