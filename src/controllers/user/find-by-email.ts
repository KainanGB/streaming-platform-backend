import { Request, Response } from 'express'
import { FindByEmailUseCase } from '@/use-cases/users/find-by-email-user-use-case'
import { z } from 'zod'

export class FindByEmailController {
  constructor(private findUserByEmail: FindByEmailUseCase) {}

  async findByEmail(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const user = await this.findUserByEmail.execute(id)

      res.status(202).send({ user })
    } catch (err) {
      const error = err as Error
      res.status(404).send({ message: error.message })
    }

    res.status(200).send()
  }
}
