import { expect, it } from 'vitest'
import { DeleteUserUseCase } from './delete-user-use-case'
import { RegisterUseCase } from './register-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'

it('should correctly delete an user', async () => {
  const userRepository = new InMemoryUsersRepository()
  const usersUseCase = new RegisterUseCase(userRepository)
  const deleteUser = new DeleteUserUseCase(userRepository)

  const user = await usersUseCase.execute({
    username: 'kainan',
    email: 'email.contato@gmail.com',
    password: '123456'
  })

  await expect(deleteUser.execute(user.id)).resolves.not.toThrow()
})

it('should throw error if user does not exists', async () => {
  const userRepository = new InMemoryUsersRepository()
  const deleteUser = new DeleteUserUseCase(userRepository)

  await expect(deleteUser.execute('123')).rejects.toBeInstanceOf(Error)
})
