import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidFollowerIdError extends Error implements DomainError {
  constructor(followerId: string) {
    super(`The follower id "${followerId}" is invalid.`);
    this.name = "InvalidFollowerIdError";
  }
}
