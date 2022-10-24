import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CheckRecoveryCodeQuery } from 'src/domain/business/slices/authentication/queries';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';

@QueryHandler(CheckRecoveryCodeQuery)
export class CheckRecoveryCodeHandler implements IQueryHandler<CheckRecoveryCodeQuery> {

  constructor(private readonly repository: RecoveryRepository) {}

  async execute(query: CheckRecoveryCodeQuery): Promise<boolean> {
    const count = await this.repository.countByCode(query.code);
    return count > 0; 
  }

}
