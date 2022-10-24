import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Authentication } from 'src/domain/business/slices/authentication/models';
import { FetchOneAuthenticationQuery } from 'src/domain/business/slices/authentication/queries';
import { AuthenticationRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(FetchOneAuthenticationQuery)
export class FetchOneAuthenticationHandler implements IQueryHandler<FetchOneAuthenticationQuery> {

  constructor(private readonly repository: AuthenticationRepository) {}

  async execute(query: FetchOneAuthenticationQuery): Promise<Authentication> {
    return await this.repository.fetchById(query.id);
  }

}
