import { Post } from "../domain/post/post";
import { Post as PostClient } from "@prisma/client";

export interface IPostsRepository {
  create(post: Post): Promise<void>;
  findBySlug(slug: string): Promise<PostClient[]>;
  findAll(): Promise<PostClient[]>;
}
