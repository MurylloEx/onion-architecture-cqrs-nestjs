import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Confirmation } from 'src/domain/business/slices/authentication/models';

export class FetchConfirmationsQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<Confirmation>
  ) {}
}
