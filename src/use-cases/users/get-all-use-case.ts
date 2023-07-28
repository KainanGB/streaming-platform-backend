import { UsersRepository } from 'src/repositories/users-repository'

export class GetAllUseCase {
  constructor(private UsersRepository: UsersRepository) {}
  async execute() {
    const users = await this.UsersRepository.getAll()
    if (!users) {
      throw new Error('no users registered')
    }
    return users
  }
}
