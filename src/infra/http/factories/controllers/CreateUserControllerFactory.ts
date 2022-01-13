import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { PrismaUsersRepository } from "@modules/accounts/repositories/prisma/PrismaUsersRepository";

export function makeCreateUserController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}
