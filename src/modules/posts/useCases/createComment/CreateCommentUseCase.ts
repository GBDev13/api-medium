import { Either, left, right } from "@core/logic/Either";
import { AuthorId } from "@modules/posts/domain/comment/authorId";
import { Comment } from "@modules/posts/domain/comment/comment";
import { Content } from "@modules/posts/domain/comment/content";
import { InvalidAuthorIdError } from "@modules/posts/domain/comment/errors/InvalidAuthorIdError";
import { InvalidPostIdError } from "@modules/posts/domain/comment/errors/InvalidPostIdError";
import { InvalidContentError } from "@modules/posts/domain/comment/errors/InvalidContentError";
import { PostId } from "@modules/posts/domain/comment/postId";
import { ICreateCommentDTO } from "@modules/posts/dtos/ICreateCommentDTO";
import { ICommentsRepository } from "@modules/posts/repositories/ICommentsRepository";

type CreateCommentUseCaseResponse = Either<
  InvalidContentError | InvalidAuthorIdError | InvalidPostIdError,
  Comment
>;

export class CreateCommentUseCase {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute({
    content,
    authorId,
    postId,
  }: ICreateCommentDTO): Promise<CreateCommentUseCaseResponse> {
    const contentOrError = Content.create(content);
    const authorIdOrError = AuthorId.create(authorId);
    const postIdOrError = PostId.create(postId);

    if (contentOrError.isLeft()) {
      return left(contentOrError.value);
    }

    if (authorIdOrError.isLeft()) {
      return left(authorIdOrError.value);
    }

    if (postIdOrError.isLeft()) {
      return left(postIdOrError.value);
    }

    const commentOrError = Comment.create({
      content: contentOrError.value,
      authorId: authorIdOrError.value,
      postId: postIdOrError.value,
    });

    if (commentOrError.isLeft()) {
      return left(commentOrError.value);
    }

    const comment = commentOrError.value;

    await this.commentsRepository.create(comment);

    return right(comment);
  }
}
