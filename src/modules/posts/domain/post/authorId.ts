import { Either, left, right } from "@core/logic/Either";
import { InvalidAuthorIdError } from "./errors/InvalidAuthorIdError";

export class AuthorId {
  private readonly authorId: string;

  get value(): string {
    return this.authorId;
  }

  private constructor(authorId: string) {
    this.authorId = authorId;
  }

  static validate(authorId: string): boolean {
    if (!authorId) {
      return false;
    }

    return true;
  }

  static create(authorId: string): Either<InvalidAuthorIdError, AuthorId> {
    if (!this.validate(authorId)) {
      return left(new InvalidAuthorIdError(authorId));
    }

    return right(new AuthorId(authorId));
  }
}
