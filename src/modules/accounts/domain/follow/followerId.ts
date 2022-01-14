import { Either, left, right } from "@core/logic/Either";
import { InvalidFollowerIdError } from "./errors/InvalidFollowingIdError";

export class FollowerId {
  private readonly followerId: string;

  get value(): string {
    return this.followerId;
  }

  private constructor(followerId: string) {
    this.followerId = followerId;
  }

  static validate(followerId: string): boolean {
    if (!followerId) {
      return false;
    }

    return true;
  }

  static create(
    followerId: string
  ): Either<InvalidFollowerIdError, FollowerId> {
    if (!this.validate(followerId)) {
      return left(new InvalidFollowerIdError(followerId));
    }

    return right(new FollowerId(followerId));
  }
}
