import { Controller } from "@core/infra/Controller";
import { HttpResponse, fail, ok } from "@core/infra/HttpResponse";
import { GetAllPostsUseCase } from "./GetAllPostsUseCase";

export class GetAllPostsController implements Controller {
  constructor(private getAllPostsuseCase: GetAllPostsUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.getAllPostsuseCase.execute();

      return ok({ data: result });
    } catch (err) {
      return fail(err);
    }
  }
}
