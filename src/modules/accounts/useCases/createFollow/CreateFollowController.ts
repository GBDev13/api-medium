import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  created,
  fail,
  HttpResponse,
} from "@core/infra/HttpResponse";
import { FollowAlreadyExistsError } from "@modules/accounts/errors/FollowAlreadyExistsError";
import { CreateFollowUseCase } from "./CreateFollowUseCase";

type CreateFollowControllerRequest = {
  userId: string;
  followerId: string;
};

class CreateFollowController implements Controller {
  constructor(private createFollowUseCase: CreateFollowUseCase) {}

  async handle({
    userId,
    followerId,
  }: CreateFollowControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createFollowUseCase.execute({
        followerId,
        followingId: userId,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case FollowAlreadyExistsError:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        return created();
      }
    } catch (err) {
      return fail(err);
    }
  }
}

export { CreateFollowController };
