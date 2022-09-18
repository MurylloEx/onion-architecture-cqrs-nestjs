import { IQuery } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { Establishment } from 'src/domain/business/slices/establishment/models';

export class FetchEstablishmentsQuery implements IQuery {
  constructor(
    public readonly options?: FindManyOptions<Establishment>
  ) {}
}
