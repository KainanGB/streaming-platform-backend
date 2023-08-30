import { NextFunction, Request, Response } from 'express'
import { FindByEmailUseCase } from '@/use-cases/users/find-by-email-user-use-case'
import { z } from 'zod'

export class FindByEmailController {
  constructor(private findUserByEmail: FindByEmailUseCase) {}

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const user = await this.findUserByEmail.execute(id)

      return res.status(200).send({ user })
    } catch (err) {
      next(err)
    }
  }
}
