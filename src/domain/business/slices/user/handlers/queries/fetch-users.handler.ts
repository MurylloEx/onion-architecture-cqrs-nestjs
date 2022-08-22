import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { FetchUsersQuery } from 'src/domain/business/slices/user/queries';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

@QueryHandler(FetchUsersQuery)
export class FetchUserHandler implements IQueryHandler<FetchUsersQuery> {

  constructor(private readonly repository: UserRepository) {}

  async execute(query: FetchUsersQuery): Promise<User[]> {
    return await this.repository.fetch(query.options);
  }

}
