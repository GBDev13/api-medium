import { CreateFollowUseCase } from "@modules/accounts/useCases/createFollow/CreateFollowUseCase";
import { PrismaFollowsRepository } from "@modules/accounts/repositories/prisma/PrismaFollowsRepository";
import { CreateFollowController } from "@modules/accounts/useCases/createFollow/CreateFollowController";

export function makeCreateFollowController() {
  const prismaFollowsRepository = new PrismaFollowsRepository();
  const createFollowUseCase = new CreateFollowUseCase(prismaFollowsRepository);

  const createFollowController = new CreateFollowController(
    createFollowUseCase
  );

  return createFollowController;
}
