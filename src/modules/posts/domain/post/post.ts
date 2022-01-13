import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { AuthorId } from "./authorId";
import { Content } from "./content";
import { InvalidContentError } from "./errors/InvalidContentError";
import { InvalidTitleError } from "./errors/InvalidTitleError";
import { Slug } from "./slug";
import { Title } from "./title";

interface IPostProps {
  slug: Slug;
  title: Title;
  content: Content;
  authorId: AuthorId;
}

export class Post extends Entity<IPostProps> {
  get slug() {
    return this.props.slug;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  private constructor(props: IPostProps, id?: string) {
    super(props, id);
  }

  static create(
    props: IPostProps,
    id?: string
  ): Either<InvalidTitleError | InvalidContentError, Post> {
    const post = new Post(props, id);

    return right(post);
  }
}
