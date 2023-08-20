import { Request, Response } from 'express'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'
import { z } from 'zod'

export class DeleteController {
  constructor(private deleteUser: DeleteUserUseCase) {}

  async delete(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string()
      })

      const { id } = paramsSchema.parse(req.params)

      await this.deleteUser.execute(id)

      res.status(204).send({
        message: 'user has been deleted'
      })
    } catch (err) {
      const error = err as Error
      res.status(404).send({ message: error.message })
    }
  }
}
