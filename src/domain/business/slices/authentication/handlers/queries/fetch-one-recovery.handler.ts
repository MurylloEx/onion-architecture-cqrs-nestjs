import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Recovery } from 'src/domain/business/slices/authentication/models';
import { FetchOneRecoveryQuery } from 'src/domain/business/slices/authentication/queries';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(FetchOneRecoveryQuery)
export class FetchOneRecoveryHandler implements IQueryHandler<FetchOneRecoveryQuery> {

  constructor(private readonly repository: RecoveryRepository) {}

  async execute(query: FetchOneRecoveryQuery): Promise<Recovery> {
    return await this.repository.fetchById(query.id);
  }

}
