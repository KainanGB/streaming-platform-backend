import { sign } from 'jsonwebtoken'

export class GenerateAccessToken {
  async execute(userId: string, role: string) {
    const token = sign(
      {
        role
      },
      process.env.JWT_SECRET!,
      {
        subject: userId,
        expiresIn: 20
      }
    )

    return token
  }
}
