import { Request, Response } from 'express'
import { GetAllUseCase } from '@/use-cases/users/get-all-user-use-case'

export class GetAllController {
  constructor(private getAllUser: GetAllUseCase) {}

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.getAllUser.execute()

      res.status(200).json({
        users
      })
    } catch (error) {
      console.log('deu ruim', error)
    }
  }
}
