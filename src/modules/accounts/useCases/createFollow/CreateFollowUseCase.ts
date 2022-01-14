import { Either, left, right } from "@core/logic/Either";
import { InvalidFollowingIdError } from "@modules/accounts/domain/follow/errors/InvalidFollowerIdError";
import { InvalidFollowerIdError } from "@modules/accounts/domain/follow/errors/InvalidFollowingIdError";
import { Follow } from "@modules/accounts/domain/follow/follow";
import { FollowerId } from "@modules/accounts/domain/follow/followerId";
import { FollowingId } from "@modules/accounts/domain/follow/followingId";
import { ICreateFollowDTO } from "@modules/accounts/dtos/ICreateFollowDTO";
import { FollowAlreadyExistsError } from "@modules/accounts/errors/FollowAlreadyExistsError";
import { IFollowsRepository } from "@modules/accounts/repositories/IFollowsRepository";
import { AccountAlreadyExistsError } from "../../errors/AccountAlreadyExistsError";

type CreateFollowUseCaseResponse = Either<
  AccountAlreadyExistsError | InvalidFollowerIdError | InvalidFollowingIdError,
  Follow
>;

export class CreateFollowUseCase {
  constructor(private followsRepository: IFollowsRepository) {}

  async execute({
    followerId,
    followingId,
  }: ICreateFollowDTO): Promise<CreateFollowUseCaseResponse> {
    const followerIdOrError = FollowerId.create(followerId);
    const followingIdOrError = FollowingId.create(followingId);

    if (followerIdOrError.isLeft()) {
      return left(followerIdOrError.value);
    }

    if (followingIdOrError.isLeft()) {
      return left(followingIdOrError.value);
    }
    const followOrError = Follow.create({
      followerId: followerIdOrError.value,
      followingId: followingIdOrError.value,
    });

    if (followOrError.isLeft()) {
      return left(followOrError.value);
    }

    const follow = followOrError.value;

    const followAlreadyExists = await this.followsRepository.findByIds(
      follow.followerId.value,
      follow.followingId.value
    );

    if (followAlreadyExists) {
      return left(new FollowAlreadyExistsError());
    }

    await this.followsRepository.create(follow);

    return right(follow);
  }
}
