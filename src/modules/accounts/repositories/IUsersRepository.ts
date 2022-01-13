import { User } from "@core/domain/user/user";

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
