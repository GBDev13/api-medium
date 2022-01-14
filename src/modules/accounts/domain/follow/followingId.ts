import { Either, left, right } from "@core/logic/Either";
import { InvalidFollowingIdError } from "./errors/InvalidFollowerIdError";

export class FollowingId {
  private readonly followingId: string;

  get value(): string {
    return this.followingId;
  }

  private constructor(followingId: string) {
    this.followingId = followingId;
  }

  static validate(followingId: string): boolean {
    if (!followingId) {
      return false;
    }

    return true;
  }

  static create(
    followingId: string
  ): Either<InvalidFollowingIdError, FollowingId> {
    if (!this.validate(followingId)) {
      return left(new InvalidFollowingIdError(followingId));
    }

    return right(new FollowingId(followingId));
  }
}
