import { UsersRepository } from '@/repositories/users-repository'

export class FindByEmailUseCase {
  constructor(private usersReposity: UsersRepository) {}

  async execute(email: string) {
    const user = await this.usersReposity.findByEmail(email)

    if (!user) {
      throw new Error('user does not exists')
    }

    return user
  }
}
