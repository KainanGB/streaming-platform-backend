import { Request, Response } from 'express'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/users/register-user-use-case'

export class RegisterController {
  constructor(private registerUser: RegisterUseCase) {}

  async register(req: Request, res: Response) {
    const bodySchema = z.object({
      username: z.string().optional(),
      email: z.string().email(),
      password: z.string().min(7)
    })

    const { username, email, password } = bodySchema.parse(req.body)

    try {
      const user = await this.registerUser.execute({ username, email, password })
      res.status(201).send({
        user
      })
    } catch (err) {
      const error = err as Error
      res.status(409).send({
        message: error.message
      })
    }
  }
}
