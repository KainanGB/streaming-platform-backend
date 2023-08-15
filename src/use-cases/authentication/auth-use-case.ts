import { compare } from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UsersRepository } from '@/repositories/users-repository'
import { IUser } from '@/@types/user'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: IUser) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
