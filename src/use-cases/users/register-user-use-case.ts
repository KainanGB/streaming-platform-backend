import { hash } from 'bcrypt'
import { UsersRepository } from '@/repositories/users-repository'
import { IUser } from '@/@types/user'

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, password, username }: IUser) {
    const password_hash = await hash(password, 6)

    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new Error('user already exists')
    }

    const user = await this.usersRepository.create({ email, password: password_hash, username })

    return user
  }
}
