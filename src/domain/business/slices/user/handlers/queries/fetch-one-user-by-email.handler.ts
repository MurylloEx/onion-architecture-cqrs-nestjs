import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserRepository } from 'src/domain/business/slices/user/repositories';
import { FetchOneUserByEmailQuery } from 'src/domain/business/slices/user/queries';
import { UserNotFoundDomainException } from 'src/domain/business/slices/user/exceptions';

@QueryHandler(FetchOneUserByEmailQuery)
export class FetchOneUserByEmailHandler implements IQueryHandler<FetchOneUserByEmailQuery> {

  constructor(private readonly repository: UserRepository) {}

  async execute(query: FetchOneUserByEmailQuery): Promise<User> {
    try {
      return await this.repository.fetchByEmail(query.email);
    } catch (error) {
      throw new UserNotFoundDomainException();
    }
  }

}
