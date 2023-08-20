import { Request, Response } from 'express'
import { z } from 'zod'
import { RefreshTokenUseCase } from '@/use-cases/authentication/refresh-token-use-case'

export class RefreshController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async refresh(req: Request, res: Response) {
    try {
      const jwtBodySchema = z.object({
        token: z.string()
      })

      const { token } = jwtBodySchema.parse(req.body)

      const { refreshToken, accessToken } = await this.refreshTokenUseCase.execute(token)

      return res
        .send({
          refreshToken,
          accessToken
        })
        .status(200)
    } catch (error) {
      return res.status(400).send('Invalid refresh token.')
    }
  }
}
