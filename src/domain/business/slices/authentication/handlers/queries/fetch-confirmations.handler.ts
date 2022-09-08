import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { FetchConfirmationsQuery } from 'src/domain/business/slices/authentication/queries';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(FetchConfirmationsQuery)
export class FetchConfirmationsHandler implements IQueryHandler<FetchConfirmationsQuery> {

  constructor(private readonly repository: ConfirmationRepository) {}

  async execute(query: FetchConfirmationsQuery): Promise<Confirmation[]> {
    return await this.repository.fetch(query.options);
  }

}
