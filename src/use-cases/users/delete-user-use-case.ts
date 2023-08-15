import { UsersRepository } from '@/repositories/users-repository'
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(id: string) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new Error('user does not exists')
    }

    await this.usersRepository.delete(id)
  }
}
