import { Request, Response } from 'express'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { z } from 'zod'

export class EditController {
  constructor(private editUser: EditUserUseCase) {}

  async edit(req: Request, res: Response) {
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

      res.status(202).send()
    } catch (err) {
      const error = err as Error
      res.status(404).send({ message: error.message })
    }
  }
}
