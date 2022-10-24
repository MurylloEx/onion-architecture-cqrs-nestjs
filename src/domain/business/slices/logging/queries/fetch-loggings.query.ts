import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Logging } from 'src/domain/business/slices/logging/models';

export class FetchLoggingsQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<Logging>
  ) {}
}
