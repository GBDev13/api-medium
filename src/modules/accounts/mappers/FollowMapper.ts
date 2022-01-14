import { Follows as PersistenceFollow } from "@prisma/client";
import { Follow } from "../domain/follow/follow";
import { FollowerId } from "../domain/follow/followerId";
import { FollowingId } from "../domain/follow/followingId";

export class FollowMapper {
  static toDomain(raw: PersistenceFollow): Follow {
    const followerIdOrError = FollowerId.create(raw.followerId);
    const followingIdOrError = FollowingId.create(raw.followingId);

    if (followerIdOrError.isLeft()) {
      throw new Error("Follower id value is invalid.");
    }

    if (followingIdOrError.isLeft()) {
      throw new Error("Following id value is invalid.");
    }

    const followOrError = Follow.create({
      followerId: followerIdOrError.value,
      followingId: followingIdOrError.value,
    });

    if (followOrError.isRight()) {
      return followOrError.value;
    }

    return null;
  }

  static async toPersistence(follow: Follow) {
    return {
      id: follow.id,
      followerId: follow.followerId,
      followingId: follow.followingId,
    };
  }
}
