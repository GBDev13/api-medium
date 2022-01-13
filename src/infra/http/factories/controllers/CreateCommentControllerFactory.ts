import { PrismaCommentsRepository } from "@modules/posts/repositories/prisma/PrismaCommentsRepository";
import { CreateCommentUseCase } from "@modules/posts/useCases/createComment/CreateCommentUseCase";
import { CreateCommentController } from "@modules/posts/useCases/createComment/CreateCommentController";

export function makeCreateCommentController() {
  const prismaCommentsRepository = new PrismaCommentsRepository();
  const createCommentUseCase = new CreateCommentUseCase(
    prismaCommentsRepository
  );

  const createCommentController = new CreateCommentController(
    createCommentUseCase
  );

  return createCommentController;
}
