import { NextFunction, Request, Response } from 'express'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'
import { z } from 'zod'
export class DeleteController {
  constructor(private deleteUser: DeleteUserUseCase) {}

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string()
      })

      const { id } = paramsSchema.parse(req.params)

      await this.deleteUser.execute(id)

      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
