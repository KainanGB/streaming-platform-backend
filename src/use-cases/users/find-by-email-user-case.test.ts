import { RegisterUseCase } from './register-user-use-case'
import { expect, it } from 'vitest'
import { FindByEmailUseCase } from './find-by-email-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'

it('should correctly find user', async () => {
  const userRepository = new InMemoryUsersRepository()
  const findUserById = new FindByEmailUseCase(userRepository)
  const usersUseCase = new RegisterUseCase(userRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  const foundUser = await findUserById.execute(user.email)

  expect(foundUser).toEqual(user)
})

it('should not find an user', async () => {
  const userRepository = new InMemoryUsersRepository()
  const findUserById = new FindByEmailUseCase(userRepository)

  await expect(() => findUserById.execute('email')).rejects.toBeInstanceOf(Error)
})
