import { UsersRepository } from '@/repositories/users-repository'

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new Error('user not found')
    }
    return user
  }
}
