import { ICreatePost, IUpdatePost, PostWithCount, UsersPostRepository } from '../post-repository'

export class InMemoryPostRepository implements UsersPostRepository {
  public posts: PostWithCount[] = []

  async create({ author, authorId, body, title }: ICreatePost) {
    const post = {
      id: 'teste-id',
      upvotes: 1,
      downvotes: 0,
      created_at: new Date(),
      updated_at: new Date(),
      author,
      authorId,
      body,
      title,
      _count: {
        comments: 1
      }
    }

    this.posts.push(post)

    return post
  }
  async delete(id: string, userId: string) {
    const post = this.posts.find((post) => post.id === id && post.authorId === userId)

    if (!post) {
      return null
    }

    this.posts.filter((post) => post.id !== id)

    return post
  }

  async edit(postId: string, userId: string, data: IUpdatePost) {
    const post = this.posts.find((post) => post.id === postId && userId === post.authorId)
    const postIndex = this.posts.findIndex((post) => post.id === postId && userId === post.authorId)

    if (!post) {
      throw new Error('post does not exists')
    }

    const newPost = {
      ...post,
      ...data
    }
    this.posts[postIndex] = newPost

    return newPost
  }
  async getAllPostsByUserId(userId: string) {
    const post = this.posts.filter((post) => post.authorId === userId)
    return post
  }

  async getAll() {
    const post = this.posts
    return post
  }
}
