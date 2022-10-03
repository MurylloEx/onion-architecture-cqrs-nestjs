import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Post } from 'src/domain/business/slices/feed/models';
import { FetchPostsQuery } from 'src/domain/business/slices/feed/queries';
import { PostRepository } from 'src/domain/business/slices/feed/repositories';

@QueryHandler(FetchPostsQuery)
export class FetchPostsHandler implements IQueryHandler<FetchPostsQuery> {

  constructor(private readonly repository: PostRepository) {}

  async execute(query: FetchPostsQuery): Promise<Post[]> {
    const posts = await this.repository.fetch(query.options);

    return posts.filter((post) => post.reports < 5);
  }

}
