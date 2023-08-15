import { expect, it } from 'vitest'
import { RegisterUseCase } from './register-user-use-case'
import { GetAllUseCase } from './get-all-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'

it('should return all users', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const createUser = new RegisterUseCase(usersRepository)
  const getAllUser = new GetAllUseCase(usersRepository)

  await createUser.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  const users = await getAllUser.execute()

  expect(users?.length).toBe(1)
})

it('should return empty array', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const getAllUser = new GetAllUseCase(usersRepository)
  const users = await getAllUser.execute()

  expect(users).toEqual([])
})

it('should return empty array and throw error', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const getAllUser = new GetAllUseCase(usersRepository)

  await expect(await getAllUser.execute()).toEqual([])
})
