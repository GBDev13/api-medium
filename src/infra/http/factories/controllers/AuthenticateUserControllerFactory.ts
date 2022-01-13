import { Controller } from "@core/infra/Controller";
import { AuthenticateUserController } from "@modules/accounts/authenticateUser/AuthenticateUserController";
import { AuthenticateUserUseCase } from "@modules/accounts/authenticateUser/AuthenticateUserUseCase";
import { PrismaUsersRepository } from "@modules/accounts/repositories/prisma/PrismaUsersRepository";

export function makeAuthenticateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    prismaUsersRepository
  );
  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase
  );

  return authenticateUserController;
}
