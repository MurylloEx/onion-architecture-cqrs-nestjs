import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Bucket } from 'src/domain/business/slices/bucket/models';

export class FetchBucketsQuery implements IQuery {
  constructor(public readonly options: FindManyOptions<Bucket>) {}
}
