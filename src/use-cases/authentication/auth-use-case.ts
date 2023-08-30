import { compare } from 'bcrypt'
import { UsersRepository } from '@/repositories/users-repository'
import { IUser } from '@/@types/user'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: IUser) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError('user auth')
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError('user auth')
    }

    return { user }
  }
}
