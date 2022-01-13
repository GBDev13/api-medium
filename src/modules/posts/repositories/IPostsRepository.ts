import { Post } from "../domain/post/post";

export interface IPostsRepository {
  create(post: Post): Promise<void>;
  findBySlug(slug: string): Promise<Post>;
}
