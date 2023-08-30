import { NextFunction, Request, Response } from 'express'
import { GetAllUseCase } from '@/use-cases/users/get-all-user-use-case'

export class GetAllController {
  constructor(private getAllUser: GetAllUseCase) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getAllUser.execute()

      return res.status(200).json({
        users
      })
    } catch (err) {
      next(err)
    }
  }
}
