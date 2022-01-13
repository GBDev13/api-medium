import { Either, left, right } from "@core/logic/Either";

import { InvalidTitleError } from "./errors/InvalidTitleError";

export class Title {
  private readonly title: string;

  get value(): string {
    return this.title;
  }

  private constructor(title: string) {
    this.title = title;
  }

  static validate(title: string): boolean {
    if (!title || title.trim().length < 2 || title.trim().length > 255) {
      return false;
    }

    return true;
  }

  static create(title: string): Either<InvalidTitleError, Title> {
    if (!this.validate(title)) {
      return left(new InvalidTitleError(title));
    }

    return right(new Title(title));
  }
}
