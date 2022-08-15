import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Bucket } from 'src/domain/business/slices/bucket/models';
import { FetchBucketsQuery } from 'src/domain/business/slices/bucket/queries';
import { BucketRepository } from 'src/domain/business/slices/bucket/repositories';

@QueryHandler(FetchBucketsQuery)
export class FetchBucketsHandler implements IQueryHandler<FetchBucketsQuery> {

  constructor(private readonly repository: BucketRepository) {}

  async execute(query: FetchBucketsQuery): Promise<Bucket[]> {
    return await this.repository.fetch(query.options);
  }

}
