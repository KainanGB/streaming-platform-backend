import { GetAllPostsByUserIdUseCase } from '@/use-cases/post/get-all-posts-by-user-id-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class GetAllPostByUserIdController {
  constructor(private getAllPostByUserId: GetAllPostsByUserIdUseCase) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        userId: z.string()
      })

      const { userId } = paramsSchema.parse(req.params)

      const { posts } = await this.getAllPostByUserId.execute(userId)

      return res.status(200).send({ posts })
    } catch (err) {
      next(err)
    }
  }
}
