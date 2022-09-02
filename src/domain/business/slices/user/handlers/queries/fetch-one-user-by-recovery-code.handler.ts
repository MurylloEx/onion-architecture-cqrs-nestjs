import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserRepository } from 'src/domain/business/slices/user/repositories';
import { FetchOneUserByRecoveryCodeQuery } from 'src/domain/business/slices/user/queries';

@QueryHandler(FetchOneUserByRecoveryCodeQuery)
export class FetchOneUserByRecoveryCodeHandler implements IQueryHandler<FetchOneUserByRecoveryCodeQuery> {

  constructor(private readonly repository: UserRepository) {}

  async execute(query: FetchOneUserByRecoveryCodeQuery): Promise<User> {
    return await this.repository.fetchByRecoveryCode(query.code);
  }

}
