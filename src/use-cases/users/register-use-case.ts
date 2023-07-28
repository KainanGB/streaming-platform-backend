import { hash } from 'bcrypt'
import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'

interface UserRegisterUseCase {
  username: string
  password: string
  email: string
}

export class RegisterUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}
  async execute({ email, password, username }: UserRegisterUseCase) {
    const password_hash = await hash(password, 6)

    const userAlreadyExist = await this.usersRepository.find(email)

    if (userAlreadyExist) {
      throw new Error('user already exists')
    }

    await this.usersRepository.create({ email, password: password_hash, username })
  }
}
