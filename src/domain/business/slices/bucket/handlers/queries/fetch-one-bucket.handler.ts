import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Bucket } from 'src/domain/business/slices/bucket/models';
import { FetchOneBucketQuery } from 'src/domain/business/slices/bucket/queries';
import { BucketRepository } from 'src/domain/business/slices/bucket/repositories';

@QueryHandler(FetchOneBucketQuery)
export class FetchOneBucketHandler implements IQueryHandler<FetchOneBucketQuery> {

  constructor(private readonly repository: BucketRepository) {}

  async execute(query: FetchOneBucketQuery): Promise<Bucket> {
    return await this.repository.fetchById(query.id);
  }

}
