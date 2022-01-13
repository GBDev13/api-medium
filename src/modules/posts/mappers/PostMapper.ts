import { Post as PersistencePost } from "@prisma/client";
import { AuthorId } from "../domain/post/authorId";
import { Content } from "../domain/post/content";
import { Post } from "../domain/post/post";
import { Slug } from "../domain/post/slug";
import { Title } from "../domain/post/title";

export class PostMapper {
  static toDomain(raw: PersistencePost): Post {
    const slugOrError = Slug.create(raw.slug);
    const titleOrError = Title.create(raw.title);
    const contentOrError = Content.create(raw.content);
    const authorIdOrError = AuthorId.create(raw.authorId);

    if (slugOrError.isLeft()) {
      throw new Error("Slug value is invalid.");
    }

    if (titleOrError.isLeft()) {
      throw new Error("Title value is invalid.");
    }

    if (contentOrError.isLeft()) {
      throw new Error("Content value is invalid.");
    }

    if (authorIdOrError.isLeft()) {
      throw new Error("Author Id value is invalid.");
    }

    const postOrError = Post.create(
      {
        slug: slugOrError.value,
        title: titleOrError.value,
        content: contentOrError.value,
        authorId: authorIdOrError.value,
      },
      raw.id
    );

    if (postOrError.isRight()) {
      return postOrError.value;
    }

    return null;
  }

  static async toPersistence(post: Post) {
    return {
      id: post.id,
      slug: post.slug.value,
      title: post.title.value,
      content: post.content.value,
      authorId: post.authorId.value,
    };
  }
}
