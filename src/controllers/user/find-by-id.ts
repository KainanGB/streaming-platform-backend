import { NextFunction, Request, Response } from 'express'
import { FindUserByIdUseCase } from '@/use-cases/users/find-by-id-user-use-case'
import { z } from 'zod'
import { AppError } from '@/errors/app-error'
import { HttpStatusCode } from '@/errors/http-status-code'

export class FindByIdController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  async findById(req: Request, res: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const user = await this.findUserById.execute(id)

      return res.status(202).send({ user })
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.NOT_FOUND, 'error while trying to find user', true))
    }
  }
}
