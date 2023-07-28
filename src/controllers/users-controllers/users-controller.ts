import { Request, Response } from 'express'
import { FindUserUseCase } from '@/use-cases/users/find-user-use-case'
import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { GetAllUseCase } from '@/use-cases/users/get-all-use-case'
import { RegisterUseCase } from '@/use-cases/users/register-use-case'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { z } from 'zod'

class UsersController {
  async register(req: Request, res: Response) {
    const bodySchema = z.object({
      username: z.string(),
      email: z.string(),
      password: z.string().min(7)
    })

    const { username, email, password } = bodySchema.parse(req.body)

    try {
      const userRepository = new PrismaUsersRepository()
      const registerUseCase = new RegisterUseCase(userRepository)
      registerUseCase.execute({ username, email, password })
    } catch (err) {
      res.status(409).send({
        message: err
      })

      throw err
    }

    res.status(201).send()
  }

  async find(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      const usersRepository = new PrismaUsersRepository()
      const findUser = new FindUserUseCase(usersRepository)

      const user = await findUser.execute(id)

      res.status(202).send({ user })
    } catch (error) {
      console.log('get by id', error)
    }

    res.status(201).send()
  }

  async getAll(req: Request, res: Response) {
    try {
      const usersRepository = new PrismaUsersRepository()
      const getAllUseCase = new GetAllUseCase(usersRepository)
      const users = await getAllUseCase.execute()

      res.status(200).send({
        users
      })
    } catch (error) {
      console.log('deu ruim', error)
    }

    res.status(200).send()
  }

  async delete(req: Request, res: Response) {
    try {
      const paramsSchema = z.object({
        id: z.string()
      })

      const { id } = paramsSchema.parse(req.params)

      const usersRepository = new PrismaUsersRepository()
      const deleteUser = new DeleteUserUseCase(usersRepository)
      await deleteUser.execute(id)

      res.status(200).send({
        message: 'User deleted'
      })
    } catch (error) {
      console.log('delete', error)
    }
    res.status(200).send()
  }

  async edit(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string()
    })

    const bodySchema = z.object({
      username: z.string(),
      email: z.string()
    })

    const bodyData = bodySchema.parse(req.body)

    const { id } = paramsSchema.parse(req.params)

    try {
      const usersRepository = new PrismaUsersRepository()
      const findUser = new FindUserUseCase(usersRepository)

      const userFound = await findUser.execute(id)

      const editUserUseCase = new EditUserUseCase(usersRepository)

      editUserUseCase.execute(bodyData, userFound)
    } catch (error) {
      console.log('edit user', error)
      res.status(404).send({
        message: 'user do not exists'
      })
    }

    res.status(202).send()
  }
}

export default new UsersController()
