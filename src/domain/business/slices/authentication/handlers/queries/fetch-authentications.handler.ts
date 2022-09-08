import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Authentication } from 'src/domain/business/slices/authentication/models';
import { FetchAuthenticationsQuery } from 'src/domain/business/slices/authentication/queries';
import { AuthenticationRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(FetchAuthenticationsQuery)
export class FetchAuthenticationsHandler implements IQueryHandler<FetchAuthenticationsQuery> {

  constructor(private readonly repository: AuthenticationRepository) {}

  async execute(query: FetchAuthenticationsQuery): Promise<Authentication[]> {
    return await this.repository.fetch(query.options);
  }

}
