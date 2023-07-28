import { IUser } from '@/@types/user'
import { User } from '@prisma/client'

export interface UsersRepository {
  create(data: IUser): Promise<void>
  find(email: string): Promise<User | null>
  edit(data: IUser, userData: User): Promise<User | null>
  delete(id: string): Promise<void>
  getAll(): Promise<User[] | null>
}
