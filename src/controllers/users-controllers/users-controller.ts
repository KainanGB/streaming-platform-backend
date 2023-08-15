import { Request, Response } from 'express'
import { FindUserByIdUseCase } from '@/use-cases/users/find-by-id-user-use-case'
import { GetAllUseCase } from '@/use-cases/users/get-all-user-use-case'
import { RegisterUseCase } from '@/use-cases/users/register-user-use-case'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'
import { FindByEmailUseCase } from '@/use-cases/users/find-by-email-user-use-case'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { z } from 'zod'

export class UsersController {
  constructor(
    private registerUser: RegisterUseCase,
    private getAllUser: GetAllUseCase,
    private findUserByEmail: FindByEmailUseCase,
    private findUserById: FindUserByIdUseCase,
    private deleteUser: DeleteUserUseCase,
    private editUser: EditUserUseCase
  ) {}
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

  async findById(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const user = await this.findUserById.execute(id)

      res.status(202).send({ user })
    } catch (err) {
      const error = err as Error
      res.status(404).send({
        message: error.message
      })
    }
  }

  async findByEmail(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const user = await this.findUserByEmail.execute(id)

      res.status(202).send({ user })
    } catch (err) {
      const error = err as Error
      res.status(404).send({ message: error.message })
    }

    res.status(200).send()
  }

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

  async delete(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string()
      })

      const { id } = paramsSchema.parse(req.params)

      await this.deleteUser.execute(id)

      res.status(204).send({
        message: 'user has been deleted'
      })
    } catch (err) {
      const error = err as Error
      res.status(404).send({ message: error.message })
    }
  }

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
