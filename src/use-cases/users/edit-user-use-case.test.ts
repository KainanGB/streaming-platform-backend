import { FindUserByIdUseCase } from '@/use-cases/users/find-by-id-user-use-case'
import { EditUserUseCase } from '@/use-cases/users/edit-user-use-case'
import { expect, it } from 'vitest'
import { RegisterUseCase } from './register-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'

it('should correctly edit an user', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const createUserUseCase = new RegisterUseCase(usersRepository)
  const editUserUseCase = new EditUserUseCase(usersRepository)
  const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

  const user = await createUserUseCase.execute({
    email: 'email.contato@gmail.com',
    password: '123456',
    username: 'kainan'
  })

  const newData = {
    email: 'email.contato@gmail.com',
    password: 'abc',
    username: 'abc'
  }

  await editUserUseCase.execute(newData, user.id)

  const foundUser = await findUserByIdUseCase.execute(user.id)

  expect(foundUser.username).toEqual('abc')
})

it('should throw an error if user not exist', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const editUserUseCase = new EditUserUseCase(usersRepository)

  const newData = {
    email: 'email.contato@gmail.com',
    password: 'abc',
    username: 'abc'
  }

  await expect(() => editUserUseCase.execute(newData, '123')).rejects.toBeInstanceOf(Error)
})
