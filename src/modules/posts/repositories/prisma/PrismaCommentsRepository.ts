import { prisma } from "@infra/prisma/client";
import { ICommentsRepository } from "../ICommentsRepository";
import { Comment } from "@modules/posts/domain/comment/comment";
import { CommentMapper } from "@modules/posts/mappers/CommentMapper";

export class PrismaCommentsRepository implements ICommentsRepository {
  async create(comment: Comment): Promise<void> {
    const data = await CommentMapper.toPersistence(comment);

    await prisma.comment.create({ data });
  }
}
