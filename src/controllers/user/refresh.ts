import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { RefreshTokenUseCase } from '@/use-cases/authentication/refresh-token-use-case'
import { AppError } from '@/errors/app-error'
import HttpStatusCode from '@/errors/http-status-code'

export class RefreshController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async refresh(req: Request, res: Response, next: NextFunction) {
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
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.CONFLICT, 'error while trying to refresh token', true))
    }
  }
}
