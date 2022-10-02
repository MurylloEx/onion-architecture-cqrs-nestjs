import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Post } from 'src/domain/business/slices/feed/models';

export class FetchPostsQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<Post>
  ) {}
}
