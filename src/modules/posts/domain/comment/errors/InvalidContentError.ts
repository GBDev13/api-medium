import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidContentError extends Error implements DomainError {
  constructor(content: string) {
    super(`The content "${content}" is invalid.`);
    this.name = "InvalidContentError";
  }
}
