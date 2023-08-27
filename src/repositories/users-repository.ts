import { IUser } from '@/@types/user'
import { Prisma, User } from '@prisma/client'

const userWithRefreshTokenAndSubscription = Prisma.validator<Prisma.UserArgs>()({
  include: { refresh_token: true, Subscription: true }
})

export type UserWithRefreshTokenAndSubscription = Prisma.UserGetPayload<typeof userWithRefreshTokenAndSubscription>

export interface UsersRepository {
  create(data: IUser): Promise<User>
  findByEmail(email: string): Promise<UserWithRefreshTokenAndSubscription | null>
  findById(id: string): Promise<Omit<UserWithRefreshTokenAndSubscription, 'password'> | null>
  edit(data: Omit<IUser, 'password'>, id: string): Promise<User | null>
  delete(id: string): Promise<void>
  getAll(): Promise<User[] | null>
}
