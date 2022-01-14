import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { InvalidFollowingIdError } from "./errors/InvalidFollowerIdError";
import { InvalidFollowerIdError } from "./errors/InvalidFollowingIdError";

import { FollowerId } from "./followerId";
import { FollowingId } from "./followingId";

interface IFollowProps {
  followerId: FollowerId;
  followingId: FollowingId;
}

export class Follow extends Entity<IFollowProps> {
  get followerId() {
    return this.props.followerId;
  }

  get followingId() {
    return this.props.followingId;
  }

  private constructor(props: IFollowProps) {
    super(props);
  }

  static create(
    props: IFollowProps
  ): Either<InvalidFollowerIdError | InvalidFollowingIdError, Follow> {
    const follow = new Follow(props);

    return right(follow);
  }
}
