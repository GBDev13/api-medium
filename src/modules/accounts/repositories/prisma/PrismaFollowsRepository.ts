import { prisma } from "@infra/prisma/client";
import { Follow } from "@modules/accounts/domain/follow/follow";
import { FollowMapper } from "@modules/accounts/mappers/FollowMapper";
import { Follows } from "@prisma/client";
import { IFollowsRepository } from "../IFollowsRepository";

export class PrismaFollowsRepository implements IFollowsRepository {
  async create(follow: Follow): Promise<void> {
    const data = await FollowMapper.toPersistence(follow);

    await prisma.follows.create({
      data: {
        followerId: data.followerId.value,
        followingId: data.followingId.value,
      },
    });
  }

  async findByIds(followerId: string, followingId: string): Promise<Follows> {
    const result = await prisma.follows.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    return result;
  }
}
