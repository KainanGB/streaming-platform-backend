import { Request, Response } from 'express'
import { PrismaUsersRepository } from '@/repositories/users-prisma-repository'
import { GetAllUseCase } from '@/use-cases/users/get-all-use-case'

async function getAllController(req: Request, res: Response) {
  try {
    const usersRepository = new PrismaUsersRepository()

    const usersUseCase = new GetAllUseCase(usersRepository)

    const users = await usersUseCase.execute()

    if (!users) {
      throw new Error('no users registered')
    }

    res.status(200).send({
      users
    })
  } catch (error) {
    console.log('deu ruim', error)
  }

  res.status(200).send()
}

export default getAllController
