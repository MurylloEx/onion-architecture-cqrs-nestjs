import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserRepository } from 'src/domain/business/slices/user/repositories';
import { FetchOneUserByRecoveryCodeQuery } from 'src/domain/business/slices/user/queries';
import { UserNotFoundDomainException } from 'src/domain/business/slices/user/exceptions';

@QueryHandler(FetchOneUserByRecoveryCodeQuery)
export class FetchOneUserByRecoveryCodeHandler implements IQueryHandler<FetchOneUserByRecoveryCodeQuery> {

  constructor(private readonly repository: UserRepository) {}

  async execute(query: FetchOneUserByRecoveryCodeQuery): Promise<User> {
    try {
      return await this.repository.fetchByRecoveryCode(query.code);
    } catch (error) {
      throw new UserNotFoundDomainException();
    }
  }

}
