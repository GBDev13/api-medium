import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidFollowingIdError extends Error implements DomainError {
  constructor(followingId: string) {
    super(`The following id "${followingId}" is invalid.`);
    this.name = "InvalidFollowingIdError";
  }
}
