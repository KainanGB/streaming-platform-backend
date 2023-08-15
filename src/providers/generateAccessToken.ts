import { sign } from 'jsonwebtoken'

export class GenerateAccessToken {
  async execute(userId: string) {
    const token = sign({}, process.env.JWT_SECRET!, {
      subject: userId,
      expiresIn: 20
    })

    return token
  }
}
