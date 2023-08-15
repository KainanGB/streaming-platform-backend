import { expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { RegisterUseCase } from '../users/register-user-use-case'
import { FindByEmailUseCase } from '../users/find-by-email-user-use-case'

it('should correctly authenticate', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const usersUseCase = new RegisterUseCase(usersRepository)
  const findUserByEmail = new FindByEmailUseCase(usersRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  const foundUser = await findUserByEmail.execute(user.email)

  expect(foundUser.password).toEqual(user.password)
})

it('should throw error if user not authenticate', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const usersUseCase = new RegisterUseCase(usersRepository)
  const findUserByEmail = new FindByEmailUseCase(usersRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  const foundUser = await findUserByEmail.execute(user.email)

  expect(foundUser.password).not.toEqual('user.password')
})
