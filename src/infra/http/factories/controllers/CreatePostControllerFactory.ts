import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { CreatePostUseCase } from "@modules/posts/useCases/createPost/CreatePostUseCase";
import { PrismaPostsRepository } from "@modules/posts/repositories/prisma/PrismaPostsRepository";

export function makeCreatePostController() {
  const prismaPostsRepository = new PrismaPostsRepository();
  const createPostUseCase = new CreatePostUseCase(prismaPostsRepository);

  const createPostController = new CreatePostController(createPostUseCase);

  return createPostController;
}
