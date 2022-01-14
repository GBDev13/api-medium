import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class FollowAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super("User already follow this user");
    this.name = "FollowAlreadyExistsError";
  }
}
