import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Authentication } from 'src/domain/business/slices/authentication/models';

export class FetchAuthenticationsQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<Authentication>
  ) {}
}
