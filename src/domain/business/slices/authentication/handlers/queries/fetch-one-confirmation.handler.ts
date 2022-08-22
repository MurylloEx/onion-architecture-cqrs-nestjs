import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { FetchOneConfirmationQuery } from 'src/domain/business/slices/authentication/queries';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(FetchOneConfirmationQuery)
export class FetchOneConfirmationHandler implements IQueryHandler<FetchOneConfirmationQuery> {

  constructor(private readonly repository: ConfirmationRepository) {}

  async execute(query: FetchOneConfirmationQuery): Promise<Confirmation> {
    return await this.repository.fetchById(query.id);
  }

}
