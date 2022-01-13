import { IPostsRepository } from "../../repositories/IPostsRepository";
import { Post } from "@prisma/client";

type GetAllSendersResponse = Post[];

export class GetAllPostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(): Promise<GetAllSendersResponse> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}
