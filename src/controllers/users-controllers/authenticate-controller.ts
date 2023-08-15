import { Request, Response } from 'express'
import { GenerateAccessToken } from '@/providers/generateAccessToken'
import { GenerateRefreshToken } from '@/providers/generateRefreshToken'
import { AuthenticateUseCase } from '@/use-cases/authentication/auth-use-case'
import { z } from 'zod'
import { DeleteRefreshTokenUseCase } from '@/use-cases/authentication/delete-refresh-token-use-case'

export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase,
    private generateAcessToken: GenerateAccessToken,
    private generateRefreshToken: GenerateRefreshToken,
    private deleteToken: DeleteRefreshTokenUseCase
  ) {}

  async authenticate(req: Request, res: Response) {
    const authenticateBody = z.object({
      email: z.string().email(),
      password: z.string().min(7)
    })
    const { email, password } = authenticateBody.parse(req.body)

    try {
      const { user } = await this.authenticateUseCase.execute({
        email,
        password
      })

      const accessToken = await this.generateAcessToken.execute(user.id)

      if (user.refresh_token) {
        await this.deleteToken.execute(user.id)

        const refreshToken = await this.generateRefreshToken.execute(user.id)

        return res.status(200).send({ accessToken, refreshToken })
      }

      const refreshToken = await this.generateRefreshToken.execute(user.id)

      return res.status(200).send({ accessToken, refreshToken })
    } catch (err) {
      const error = err as Error
      res.status(409).send({
        message: error.message
      })
    }
  }
}
