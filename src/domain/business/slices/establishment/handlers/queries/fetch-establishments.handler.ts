import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Establishment } from 'src/domain/business/slices/establishment/models';
import { FetchEstablishmentsQuery } from 'src/domain/business/slices/establishment/queries';
import { EstablishmentRepository } from 'src/domain/business/slices/establishment/repositories';

@QueryHandler(FetchEstablishmentsQuery)
export class FetchEstablishmentsHandler implements IQueryHandler<FetchEstablishmentsQuery> {

  constructor(private readonly repository: EstablishmentRepository) {}

  async execute(query: FetchEstablishmentsQuery): Promise<Establishment[]> {
    return await this.repository.fetch(query.options);
  }

}
