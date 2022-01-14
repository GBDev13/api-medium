import { IPostsRepository } from "../../repositories/IPostsRepository";
import { Post } from "@prisma/client";

type GetAllPostsResponse = Post[];

export class GetAllPostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(): Promise<GetAllPostsResponse> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}
