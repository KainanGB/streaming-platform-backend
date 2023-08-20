import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { Express } from 'express'
import request from 'supertest'

export interface ResponseAuth {
  accessToken: string
  refreshToken: {
    id: string
    expiresIn: number
    userId: string
  }
}

export async function createAndAuthenticateUser(
  app: Express,
  isAdmin = false
): Promise<{
  statusCode: number
  authResponseData: ResponseAuth
}> {
  await prisma.user.create({
    data: {
      username: 'fulano',
      email: 'fulano@example.com',
      password: await hash('1234567', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER'
    }
  })

  const authResponse = await request(app).post('/sessions').send({
    email: 'fulano@example.com',
    password: '1234567'
  })

  const authResponseData = authResponse.body

  return {
    authResponseData,
    statusCode: authResponse.statusCode
  }
}
