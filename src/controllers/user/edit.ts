import { NextFunction, Request, Response } from 'express'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { z } from 'zod'
import { HttpStatusCode } from '@/errors/http-status-code'
import { AppError } from '@/errors/app-error'

export class EditController {
  constructor(private editUser: EditUserUseCase) {}

  async edit(req: Request, res: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const bodySchema = z.object({
      username: z.string(),
      email: z.string().email()
    })

    const bodyData = bodySchema.parse(req.body)

    const { id } = paramsSchema.parse(req.params)

    try {
      await this.editUser.execute(bodyData, id)

      return res.status(202).send()
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.NOT_FOUND, 'error while trying to edit user', true))
    }
  }
}
