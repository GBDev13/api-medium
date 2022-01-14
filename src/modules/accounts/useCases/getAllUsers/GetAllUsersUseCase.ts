import { User } from "@prisma/client";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

type GetAllUsersResponse = User[];

export class GetAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
