import { UsersRepository } from 'src/repositories/users-repository'

export class GetAllUseCase {
  constructor(private UsersRepository: UsersRepository) {}
  async execute() {
    const users = await this.UsersRepository.getAll()
    return users
  }
}
