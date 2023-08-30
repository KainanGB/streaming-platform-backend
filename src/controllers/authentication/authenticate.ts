import { NextFunction, Request, Response } from 'express'
import { GenerateAccessToken } from '@/providers/generate-access-token'
import { GenerateRefreshToken } from '@/providers/generate-refresh-token'
import { AuthenticateUseCase } from '@/use-cases/authentication/auth-use-case'
import { z } from 'zod'
import { DeleteRefreshTokenUseCase } from '@/use-cases/authentication/delete-refresh-token-use-case'

export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase,
    private generateAcessToken: GenerateAccessToken,
    private generateRefreshToken: GenerateRefreshToken,
    private deleteTokenUseCase: DeleteRefreshTokenUseCase
  ) {}

  async authenticate(req: Request, res: Response, next: NextFunction) {
    const authenticateBody = z.object({
      email: z.string().email(),
      password: z.string().min(7)
    })

    try {
      const { email, password } = authenticateBody.parse(req.body)

      const { user } = await this.authenticateUseCase.execute({
        email,
        password
      })

      const accessToken = await this.generateAcessToken.execute(user.id, user.role)

      if (user.refresh_token) {
        await this.deleteTokenUseCase.execute(user.id)

        const refreshToken = await this.generateRefreshToken.execute(user.id)

        return res.status(200).send({ accessToken, refreshToken })
      }

      const refreshToken = await this.generateRefreshToken.execute(user.id)

      return res.status(200).send({ accessToken, refreshToken })
    } catch (err) {
      next(err)
    }
  }
}
