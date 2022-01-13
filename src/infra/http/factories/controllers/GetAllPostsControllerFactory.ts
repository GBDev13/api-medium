import { GetAllPostsController } from "@modules/posts/useCases/getAllPosts/GetAllPostsController";
import { GetAllPostsUseCase } from "@modules/posts/useCases/getAllPosts/GetAllPostsUseCase";
import { PrismaPostsRepository } from "@modules/posts/repositories/prisma/PrismaPostsRepository";

export function makeGetAllPostsController() {
  const prismaPostsRepository = new PrismaPostsRepository();
  const getAllPostsUseCase = new GetAllPostsUseCase(prismaPostsRepository);

  const getAllPostsController = new GetAllPostsController(getAllPostsUseCase);

  return getAllPostsController;
}
