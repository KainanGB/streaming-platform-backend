import { expect, it } from 'vitest'
import { InMemoryAuthRepository } from '@/repositories/in-memory-repository/in-memory-auth-repository'

it('should correctly delete an token', async () => {
  const authRepository = new InMemoryAuthRepository()

  const userId = 'teste'
  const expiresIn = 123

  const refreshToken = await authRepository.refresh(userId, expiresIn)

  await expect(authRepository.deleteToken(refreshToken.userId)).resolves.not.toThrow()
})

it('should throw error if token doest not exists', async () => {
  const authRepository = new InMemoryAuthRepository()

  const userId = 'teste'
  const expiresIn = 123

  await authRepository.refresh(userId, expiresIn)

  await expect(authRepository.deleteToken('unknow id')).rejects.toBeInstanceOf(Error)
})
