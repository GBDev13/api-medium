import { PrismaUsersRepository } from "@modules/accounts/repositories/prisma/PrismaUsersRepository";
import { GetAllUsersUseCase } from "@modules/accounts/useCases/getAllUsers/GetAllUsersUseCase";
import { GetAllUsersController } from "@modules/accounts/useCases/getAllUsers/GetAllUsersController";

export function makeGetAllUsersController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository);

  const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

  return getAllUsersController;
}
