import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidPostIdError extends Error implements DomainError {
  constructor(authorId: string) {
    super(`The post id "${authorId}" is invalid.`);
    this.name = "InvalidPostIdError";
  }
}
