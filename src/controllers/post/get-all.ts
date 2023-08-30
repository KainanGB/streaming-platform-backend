import { GetAllPostsUseCase } from '@/use-cases/post/get-all-posts-use-case'
import { NextFunction, Request, Response } from 'express'

export class GetAllPostController {
  constructor(private getAllPostsUseCase: GetAllPostsUseCase) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { posts } = await this.getAllPostsUseCase.execute()

      return res.status(200).send({ posts })
    } catch (err) {
      next(err)
    }
  }
}
