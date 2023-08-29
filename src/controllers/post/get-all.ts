import { AppError } from '@/errors/app-error'
import { HttpStatusCode } from '@/errors/http-status-code'
import { GetAllPostsUseCase } from '@/use-cases/post/get-all-posts-use-case'
import { NextFunction, Request, Response } from 'express'

export class GetAllPostController {
  constructor(private getAllPostsUseCase: GetAllPostsUseCase) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { posts } = await this.getAllPostsUseCase.execute()

      return res.status(200).send({ posts })
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.BAD_REQUEST, 'error while trying to get all users', true))
    }
  }
}
