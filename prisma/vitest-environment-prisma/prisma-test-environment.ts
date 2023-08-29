import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL() {
  if (!process.env.TEST_DATABASE_URL) {
    throw new Error('Please provide a TEST_DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.TEST_DATABASE_URL)

  url.pathname = `/${randomUUID()}`

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const NEW_DATABASE_URL = generateDatabaseURL()

    process.env.DATABASE_URL = NEW_DATABASE_URL

    return {
      async teardown() {
        await prisma.$runCommandRaw({
          dropDatabase: 1
        })

        await prisma.$disconnect()
      }
    }
  }
}
