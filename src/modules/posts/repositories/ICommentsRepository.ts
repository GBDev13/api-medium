import { Comment } from "../domain/comment/comment";

export interface ICommentsRepository {
  create(comment: Comment): Promise<void>;
}
