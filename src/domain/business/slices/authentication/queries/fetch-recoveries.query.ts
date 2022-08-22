import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Recovery } from 'src/domain/business/slices/authentication/models';

export class FetchRecoveriesQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<Recovery>
  ) {}
}
