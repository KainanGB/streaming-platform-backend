import { Request, Response } from 'express'
import { FindUserByIdUseCase } from '@/use-cases/users/find-by-id-user-use-case'
import { z } from 'zod'

export class FindByIdController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  async findById(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const user = await this.findUserById.execute(id)

      res.status(202).send({ user })
    } catch (err) {
      const error = err as Error
      res.status(404).send({
        message: error.message
      })
    }
  }
}
