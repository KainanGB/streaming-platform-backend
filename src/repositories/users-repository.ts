import { IUser } from '@/@types/user'
import { Prisma, User } from '@prisma/client'

const userWithRefreshToken = Prisma.validator<Prisma.UserArgs>()({
  include: { refresh_token: true }
})
type UserWithRefreshToken = Prisma.UserGetPayload<typeof userWithRefreshToken>

export interface UsersRepository {
  create(data: IUser): Promise<User>
  findByEmail(email: string): Promise<UserWithRefreshToken | null>
  findById(id: string): Promise<Omit<User, 'password'> | null>
  edit(data: Omit<IUser, 'password'>, id: string): Promise<User | null>
  delete(id: string): Promise<void>
  getAll(): Promise<User[] | null>
}
