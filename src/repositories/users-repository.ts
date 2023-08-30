import { IUser } from '@/@types/user'
import { Prisma, User } from '@prisma/client'

const userCustomResponse = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    refresh_token: true,
    username: true,
    created_at: true,
    subscription: true,
    updated_at: true,
    role: true
  }
})

export type UserCustomResponse = Prisma.UserGetPayload<typeof userCustomResponse>

export interface UsersRepository {
  create(data: IUser): Promise<UserCustomResponse>
  findByEmail(email: string): Promise<(UserCustomResponse & User) | null>
  findById(id: string): Promise<UserCustomResponse | null>
  edit(data: Omit<IUser, 'password'>, id: string): Promise<User | null>
  delete(id: string): Promise<void>
  getAll(): Promise<UserCustomResponse[] | []>
}
