import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IQuery, QueryBus } from '@nestjs/cqrs';

import { Establishment } from 'src/domain/business/slices/establishment/models';
import { FetchEstablishmentsQuery } from 'src/domain/business/slices/establishment/queries';

@Injectable()
export class EstablishmentDomainService {

  constructor(private readonly queryBus: QueryBus) { }

  fetch(options?: FindManyOptions<Establishment>): Promise<Establishment[]> {
    const query = new FetchEstablishmentsQuery(options);
    return this.queryBus.execute<IQuery, Establishment[]>(query);
  }

}
