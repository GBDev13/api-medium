import { Controller } from "@core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@core/infra/HttpResponse";
import { CreateCommentUseCase } from "./CreateCommentUseCase";

type CreateCommentControllerRequest = {
  content: string;
  userId: string;
  postId: string;
};

class CreateCommentController implements Controller {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}

  async handle({
    content,
    userId,
    postId,
  }: CreateCommentControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createCommentUseCase.execute({
        content,
        authorId: userId,
        postId,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
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

export { CreateCommentController };
