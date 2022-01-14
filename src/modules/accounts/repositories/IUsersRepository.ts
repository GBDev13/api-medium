import { User } from "../domain/user/user";
import { IGetAllUsersResponse } from "../dtos/IGetAllUsersResponse";

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<IGetAllUsersResponse[]>;
}
