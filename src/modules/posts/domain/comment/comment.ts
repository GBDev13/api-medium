import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { AuthorId } from "./authorId";
import { Content } from "./content";
import { PostId } from "./postId";

import { InvalidContentError } from "./errors/InvalidContentError";
import { InvalidAuthorIdError } from "./errors/InvalidAuthorIdError";
import { InvalidPostIdError } from "./errors/InvalidPostIdError";

interface ICommentProps {
  content: Content;
  authorId: AuthorId;
  postId: PostId;
}

export class Comment extends Entity<ICommentProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get postId() {
    return this.props.postId;
  }

  private constructor(props: ICommentProps, id?: string) {
    super(props, id);
  }

  static create(
    props: ICommentProps,
    id?: string
  ): Either<
    InvalidAuthorIdError | InvalidContentError | InvalidPostIdError,
    Comment
  > {
    const comment = new Comment(props, id);

    return right(comment);
  }
}
