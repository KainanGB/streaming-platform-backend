import { Post, Prisma } from '@prisma/client'

export type IUpdatePost = {
  title: string
  body: string
}

export type ICreatePost = {
  title: string
  body: string
  authorId: string
  author: string
}

const postWithCount = Prisma.validator<Prisma.PostArgs>()({
  include: {
    _count: {
      select: { comments: true }
    }
  }
})

export type PostWithCount = Prisma.PostGetPayload<typeof postWithCount>

export interface UsersPostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  delete(postId: string, userId: string): Promise<Post | null>
  edit(postId: string, userId: string, data: IUpdatePost): Promise<Post | null>
  getAll(): Promise<PostWithCount[]>
  getAllPostsByUserId(userId: string): Promise<PostWithCount[]>
}
