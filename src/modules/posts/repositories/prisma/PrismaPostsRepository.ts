import { prisma } from "@infra/prisma/client";
import { PostMapper } from "@modules/posts/mappers/PostMapper";
import { Post } from "@modules/posts/domain/post/post";
import { Post as PostClient } from "@prisma/client";
import { IPostsRepository } from "../IPostsRepository";

export class PrismaPostsRepository implements IPostsRepository {
  async create(post: Post): Promise<void> {
    const data = await PostMapper.toPersistence(post);

    await prisma.post.create({ data });
  }

  async findBySlug(slug: string): Promise<PostClient[]> {
    const posts = await prisma.post.findMany({
      where: {
        slug: {
          startsWith: slug,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!posts) {
      return null;
    }

    return posts;
  }

  async findAll(): Promise<PostClient[]> {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        comments: {
          select: {
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return posts;
  }
}
