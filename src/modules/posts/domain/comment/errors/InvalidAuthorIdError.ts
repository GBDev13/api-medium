import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidAuthorIdError extends Error implements DomainError {
  constructor(authorId: string) {
    super(`The author id "${authorId}" is invalid.`);
    this.name = "InvalidAuthorIdError";
  }
}
