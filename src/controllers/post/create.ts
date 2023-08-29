import { AppError } from '@/errors/app-error'
import { HttpStatusCode } from '@/errors/http-status-code'
import { CreatePostUseCase } from '@/use-cases/post/create-post-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const postBodySchema = z.object({
        title: z.string(),
        body: z.string(),
        authorId: z.string()
      })

      const { authorId, body, title } = postBodySchema.parse(req.body)

      const { post } = await this.createPostUseCase.execute({ authorId, body, title })

      return res.status(202).send({ post })
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.BAD_REQUEST, 'error while trying to delete user', true))
    }
  }
}
