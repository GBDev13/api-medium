import { Either, left, right } from "@core/logic/Either";
import { AuthorId } from "../../domain/post/authorId";
import { Content } from "../../domain/post/content";
import { InvalidAuthorIdError } from "../../domain/post/errors/InvalidAuthorIdError";
import { InvalidContentError } from "../../domain/post/errors/InvalidContentError";
import { InvalidSlugError } from "../../domain/post/errors/InvalidSlugError";
import { InvalidTitleError } from "../../domain/post/errors/InvalidTitleError";
import { Post } from "../../domain/post/post";
import { Slug } from "../../domain/post/slug";
import { Title } from "../../domain/post/title";
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { IPostsRepository } from "../../repositories/IPostsRepository";

type CreatePostUseCaseResponse = Either<
  | InvalidSlugError
  | InvalidTitleError
  | InvalidContentError
  | InvalidAuthorIdError,
  Post
>;

export class CreatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({
    slug,
    title,
    content,
    authorId,
  }: ICreatePostDTO): Promise<CreatePostUseCaseResponse> {
    let slugOrError = Slug.create(slug);
    const titleOrError = Title.create(title);
    const contentOrError = Content.create(content);
    const authorIdOrError = AuthorId.create(authorId);

    if (slugOrError.isLeft()) {
      return left(slugOrError.value);
    }

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }

    if (contentOrError.isLeft()) {
      return left(contentOrError.value);
    }

    if (authorIdOrError.isLeft()) {
      return left(authorIdOrError.value);
    }

    const postAlreadyExists = await this.postsRepository.findBySlug(
      String(slugOrError.value.value)
    );

    const results = postAlreadyExists.length;

    if (results > 0) {
      const stringSlug = String(postAlreadyExists[0].slug);

      const splitAt = (index: number, value: string) => [
        value.slice(0, index),
        value.slice(index),
      ];

      const cuttedSlug = splitAt(
        stringSlug.length - (results === 1 ? 0 : 1),
        stringSlug
      );

      const notNumber = isNaN(Number(cuttedSlug[1]));

      let number = notNumber ? 1 : Number(cuttedSlug[1]) + 1;

      slugOrError = Slug.create(`${cuttedSlug[0]}${number}`);

      if (slugOrError.isLeft()) {
        return left(slugOrError.value);
      }
    }

    const postOrError = Post.create({
      slug: slugOrError.value,
      title: titleOrError.value,
      content: contentOrError.value,
      authorId: authorIdOrError.value,
    });

    if (postOrError.isLeft()) {
      return left(postOrError.value);
    }

    const post = postOrError.value;

    await this.postsRepository.create(post);

    return right(post);
  }
}
