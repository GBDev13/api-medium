import { Comment as PersistenceComment } from "@prisma/client";
import { AuthorId } from "../domain/comment/authorId";
import { Comment } from "../domain/comment/comment";
import { Content } from "../domain/comment/content";
import { PostId } from "../domain/comment/postId";

export class CommentMapper {
  static toDomain(raw: PersistenceComment): Comment {
    const contentOrError = Content.create(raw.content);
    const authorIdOrError = AuthorId.create(raw.authorId);
    const postIdOrError = PostId.create(raw.postId);

    if (contentOrError.isLeft()) {
      throw new Error("Content value is invalid.");
    }

    if (authorIdOrError.isLeft()) {
      throw new Error("Author Id value is invalid.");
    }

    if (postIdOrError.isLeft()) {
      throw new Error("Post Id value is invalid.");
    }

    const commentOrError = Comment.create(
      {
        content: contentOrError.value,
        authorId: authorIdOrError.value,
        postId: postIdOrError.value,
      },
      raw.id
    );

    if (commentOrError.isRight()) {
      return commentOrError.value;
    }

    return null;
  }

  static async toPersistence(post: Comment) {
    return {
      id: post.id,
      content: post.content.value,
      authorId: post.authorId.value,
      postId: post.postId.value,
    };
  }
}
