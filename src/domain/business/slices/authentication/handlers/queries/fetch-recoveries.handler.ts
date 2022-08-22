import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Recovery } from 'src/domain/business/slices/authentication/models';
import { FetchRecoveriesQuery } from 'src/domain/business/slices/authentication/queries';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(FetchRecoveriesQuery)
export class FetchRecoveriesHandler implements IQueryHandler<FetchRecoveriesQuery> {

  constructor(private readonly repository: RecoveryRepository) {}

  async execute(query: FetchRecoveriesQuery): Promise<Recovery[]> {
    return await this.repository.fetch(query.options);
  }

}
