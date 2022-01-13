import { Either, left, right } from "@core/logic/Either";

import { InvalidContentError } from "./errors/InvalidContentError";

export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private constructor(content: string) {
    this.content = content;
  }

  static validate(content: string): boolean {
    if (!content || content.trim().length < 2) {
      return false;
    }

    return true;
  }

  static create(content: string): Either<InvalidContentError, Content> {
    if (!this.validate(content)) {
      return left(new InvalidContentError(content));
    }

    return right(new Content(content));
  }
}
