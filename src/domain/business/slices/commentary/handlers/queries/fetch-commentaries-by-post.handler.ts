import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Commentary } from 'src/domain/business/slices/commentary/models';
import { CommentaryRepository } from 'src/domain/business/slices/commentary/repositories';
import { FetchCommentariesByPostQuery } from 'src/domain/business/slices/commentary/queries';

@QueryHandler(FetchCommentariesByPostQuery)
export class FetchCommentariesByPostHandler implements IQueryHandler<FetchCommentariesByPostQuery> {

  constructor(private readonly repository: CommentaryRepository) {}

  async execute(query: FetchCommentariesByPostQuery): Promise<Commentary[]> {
    return await this.repository.fetchByPostId(query.postId);
  }

}
