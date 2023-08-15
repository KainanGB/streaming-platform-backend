import { expect, it } from 'vitest'
import { InMemoryAuthRepository } from '@/repositories/in-memory-repository/in-memory-auth-repository'

it('should correctly find token', async () => {
  const authRepository = new InMemoryAuthRepository()

  const userId = 'teste'
  const expiresIn = 123

  const refreshToken = await authRepository.refresh(userId, expiresIn)

  await expect(authRepository.findTokenById(refreshToken.id)).resolves.not.toThrow()
})

it('should throw error if token is invalid', async () => {
  const authRepository = new InMemoryAuthRepository()

  const userId = 'teste'
  const expiresIn = 123

  await authRepository.refresh(userId, expiresIn)

  await expect(authRepository.findTokenById('unknow id')).rejects.toBeInstanceOf(Error)
})
