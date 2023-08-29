import { AppError } from '@/errors/app-error'
import { HttpStatusCode } from '@/errors/http-status-code'
import { DeletePostUseCase } from '@/use-cases/post/delete-post-use-case.ts'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.string()
      })

      const bodySchema = z.object({
        userId: z.coerce.string()
      })

      const { id } = paramsSchema.parse(req.params)
      const { userId } = bodySchema.parse(req.body)

      const post = await this.deletePostUseCase.execute(id, userId)

      return res.status(204).send({
        post
      })
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.BAD_REQUEST, 'error while trying to delete user', true))
    }
  }
}
