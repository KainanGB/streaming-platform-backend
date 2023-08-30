import { EditPostUseCase } from '@/use-cases/post/edit-post-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class EditPostController {
  constructor(private editPostUseCase: EditPostUseCase) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.coerce.string()
      })

      const bodySchema = z.object({
        userId: z.coerce.string(),
        title: z.string(),
        body: z.string()
      })

      const { id } = paramsSchema.parse(req.params)
      const { userId, body, title } = bodySchema.parse(req.body)

      const post = await this.editPostUseCase.execute(id, userId, { body, title })

      return res.status(204).send({
        post
      })
    } catch (err) {
      next(err)
    }
  }
}
