import { Controller } from "@core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
} from "@core/infra/HttpResponse";
import { CreatePostUseCase } from "./CreatePostUseCase";

type CreatePostControllerRequest = {
  slug: string;
  title: string;
  content: string;
  userId: string;
};

class CreatePostController implements Controller {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  async handle({
    slug,
    title,
    content,
    userId,
  }: CreatePostControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createPostUseCase.execute({
        slug,
        title,
        content,
        authorId: userId,
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

export { CreatePostController };
