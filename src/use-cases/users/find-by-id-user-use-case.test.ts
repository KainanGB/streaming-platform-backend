import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { FindUserByIdUseCase } from './find-by-id-user-use-case'
import { RegisterUseCase } from './register-user-use-case'
import { expect, it } from 'vitest'

it('should correctly find user', async () => {
  const userRepository = new InMemoryUsersRepository()
  const findUserById = new FindUserByIdUseCase(userRepository)
  const usersUseCase = new RegisterUseCase(userRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  const foundUser = await findUserById.execute(user.id)

  expect(foundUser).toEqual(user)
})

it('should not find an user', async () => {
  const userRepository = new InMemoryUsersRepository()
  const findUserById = new FindUserByIdUseCase(userRepository)
  const id = '133'
  await expect(() => findUserById.execute(id)).rejects.toBeInstanceOf(Error)
})
