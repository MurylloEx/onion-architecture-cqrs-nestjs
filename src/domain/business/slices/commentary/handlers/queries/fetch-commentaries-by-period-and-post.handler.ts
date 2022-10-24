import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CommentaryRepository } from 'src/domain/business/slices/commentary/repositories';
import { FetchCommentariesByPeriodAndPostQuery } from 'src/domain/business/slices/commentary/queries';

@QueryHandler(FetchCommentariesByPeriodAndPostQuery)
export class FetchCommentariesByPeriodAndPostHandler implements IQueryHandler<FetchCommentariesByPeriodAndPostQuery> {

  constructor(private readonly repository: CommentaryRepository) {}

  async execute(query: FetchCommentariesByPeriodAndPostQuery): Promise<number> {
    return this.repository.countByPeriodAndPostId(
      query.postId, 
      query.startDate, 
      query.endDate
    );
  }

}
