import { Either, left, right } from "@core/logic/Either";
import { InvalidPostIdError } from "./errors/InvalidPostIdError";

export class PostId {
  private readonly postId: string;

  get value(): string {
    return this.postId;
  }

  private constructor(postId: string) {
    this.postId = postId;
  }

  static validate(postId: string): boolean {
    if (!postId) {
      return false;
    }

    return true;
  }

  static create(postId: string): Either<InvalidPostIdError, PostId> {
    if (!this.validate(postId)) {
      return left(new InvalidPostIdError(postId));
    }

    return right(new PostId(postId));
  }
}
