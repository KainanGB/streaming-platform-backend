import { RefreshToken } from '@prisma/client'

export interface AuthRepository {
  refresh(userId: string, expiresIn: number): Promise<RefreshToken>
  findTokenById(id: string): Promise<RefreshToken | null>
  deleteToken(id: string): Promise<void>
}
