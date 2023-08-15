import { it, expect } from 'vitest'
import { RegisterUseCase } from './register-user-use-case'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'

it('should be able to create an user', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const usersUseCase = new RegisterUseCase(usersRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  expect(user.id).toEqual(expect.any(String))
})

it('should have an correctly hashed password', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const usersUseCase = new RegisterUseCase(usersRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  const isPasswordCorrectlyHashed = await compare('123456', user.password)

  expect(isPasswordCorrectlyHashed).toBe(true)
})

it('should not be able to create an user twice with the same email', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const createUserUseCase = new RegisterUseCase(usersRepository)

  const email = 'email.contato@gmail.com'

  await createUserUseCase.execute({
    email,
    password: '123456',
    username: 'kainan'
  })

  await expect(() =>
    createUserUseCase.execute({
      email,
      password: '123456',
      username: 'kainan'
    })
  ).rejects.toBeInstanceOf(Error)
})
