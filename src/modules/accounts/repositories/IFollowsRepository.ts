import { Follows } from "@prisma/client";
import { Follow } from "../domain/follow/follow";

export interface IFollowsRepository {
  create(data: Follow): Promise<void>;
  findByIds(followerId: string, followingId: string): Promise<Follows>;
}
