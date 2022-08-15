import { IQuery } from '@nestjs/cqrs';

export class FetchOneBucketQuery implements IQuery {
  constructor(public readonly id: string) {}
}
