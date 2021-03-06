import { prisma } from "@infra/prisma/client";
import { User } from "@modules/accounts/domain/user/user";
import { IGetAllUsersResponse } from "@modules/accounts/dtos/IGetAllUsersResponse";
import { UserMapper } from "@modules/accounts/mappers/UserMapper";
import { IUsersRepository } from "../IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findAll(): Promise<IGetAllUsersResponse[]> {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        following: {
          select: {
            follower: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return data;
  }
}
