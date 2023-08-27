import { prisma } from '@/lib/prisma'
import { UsersPostRepository } from '../post-repository'
import { Prisma } from '@prisma/client'

export class PostPrismaRepository implements UsersPostRepository {
  async create(data: Prisma.PostUncheckedCreateInput) {
    const post = await prisma.post.create({ data })

    return post
  }
  async delete(id: string, userId: string) {
    const post = await prisma.post.findFirst({
      where: { id, authorId: userId }
    })

    return post
  }
  async edit(userId: string, id: string, data: Prisma.PostUpdateInput) {
    const post = await prisma.post.update({
      where: { id, authorId: userId },
      data
    })

    return post
  }
  async getAll() {
    const posts = await prisma.post.findMany({
      orderBy: {
        upvotes: 'desc'
      },
      include: {
        _count: {
          select: { comments: true }
        }
      }
    })

    return posts
  }

  async getAllPostsByUserId(userId: string) {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: {
        upvotes: 'desc'
      },
      include: {
        _count: {
          select: { comments: true }
        }
      }
    })

    return posts
  }
}
