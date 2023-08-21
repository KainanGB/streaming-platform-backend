import { NextFunction, Request, Response } from 'express'
import { GetAllUseCase } from '@/use-cases/users/get-all-user-use-case'
import { AppError } from '@/errors/app-error'
import HttpStatusCode from '@/errors/http-status-code'

export class GetAllController {
  constructor(private getAllUser: GetAllUseCase) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getAllUser.execute()

      return res.status(200).json({
        users
      })
    } catch (err) {
      const Error = err as Error
      next(new AppError(Error.message, HttpStatusCode.NOT_FOUND, 'error while trying to get all users', true))
    }
  }
}
