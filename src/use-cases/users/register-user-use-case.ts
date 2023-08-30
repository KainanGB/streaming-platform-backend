import { hash } from 'bcrypt'
import { UsersRepository } from '@/repositories/users-repository'
import { IUser } from '@/@types/user'
import { ResourceAlreadyExists } from '@/errors/resource-already-exists'

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, password, username }: IUser) {
    const password_hash = await hash(password, 6)

    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new ResourceAlreadyExists('user register')
    }

    const user = await this.usersRepository.create({ email, password: password_hash, username })

    return user
  }
}
