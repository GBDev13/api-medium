import { prisma } from "@infra/prisma/client";
import { Post } from "@modules/posts/domain/post/post";
import { PostMapper } from "@modules/posts/mappers/PostMapper";
import { IPostsRepository } from "../IPostsRepository";

export class PrismaPostsRepository implements IPostsRepository {
  async create(post: Post): Promise<void> {
    const data = await PostMapper.toPersistence(post);

    await prisma.post.create({ data });
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return null;
    }

    return PostMapper.toDomain(post);
  }
}
