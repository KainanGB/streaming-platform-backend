import { UsersRepository } from '@/repositories/users-repository'

export class FindUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.find(id)
    if (!user) {
      throw new Error('user not found')
    }
    return user
  }
}
