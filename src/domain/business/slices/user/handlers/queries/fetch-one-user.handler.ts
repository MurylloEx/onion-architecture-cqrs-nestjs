import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { FetchOneUserQuery } from 'src/domain/business/slices/user/queries';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

@QueryHandler(FetchOneUserQuery)
export class FetchOneUserHandler implements IQueryHandler<FetchOneUserQuery> {

  constructor(private repository: UserRepository) {}

  async execute(query: FetchOneUserQuery): Promise<User> {
    return await this.repository.fetchById(query.id);
  }

}
