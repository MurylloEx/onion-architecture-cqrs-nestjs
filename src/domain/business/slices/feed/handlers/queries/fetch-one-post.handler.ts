import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Post } from 'src/domain/business/slices/feed/models';
import { FetchOnePostQuery } from 'src/domain/business/slices/feed/queries';
import { PostRepository } from 'src/domain/business/slices/feed/repositories';
import { PostNotFoundDomainException } from 'src/domain/business/slices/feed/exceptions';

@QueryHandler(FetchOnePostQuery)
export class FetchOnePostHandler implements IQueryHandler<FetchOnePostQuery> {

  constructor(private readonly repository: PostRepository) {}

  async execute(query: FetchOnePostQuery): Promise<Post> {
    const post = await this.repository.fetchById(query.id);

    if (post.reports >= 5) {
      throw new PostNotFoundDomainException();
    }

    return post;
  }

}
