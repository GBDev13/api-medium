import { Either, left, right } from "@core/logic/Either";

import { InvalidSlugError } from "./errors/InvalidSlugError";

export class Slug {
  private readonly slug: string;

  get value(): string {
    return this.slug;
  }

  private constructor(slug: string) {
    this.slug = slug;
  }

  static validate(slug: string): boolean {
    if (!slug || slug.trim().length < 2) {
      return false;
    }

    return true;
  }

  static create(slug: string): Either<InvalidSlugError, Slug> {
    if (!this.validate(slug)) {
      return left(new InvalidSlugError(slug));
    }

    return right(new Slug(slug));
  }
}
