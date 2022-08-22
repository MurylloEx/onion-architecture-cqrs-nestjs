import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserRepository } from 'src/domain/business/slices/user/repositories';
import { FetchOneUserByNickNameQuery } from 'src/domain/business/slices/user/queries';

@QueryHandler(FetchOneUserByNickNameQuery)
export class FetchOneUserByNickNameHandler implements IQueryHandler<FetchOneUserByNickNameQuery> {

  constructor(private readonly repository: UserRepository) {}

  async execute(query: FetchOneUserByNickNameQuery): Promise<User> {
    return await this.repository.fetchByNickName(query.nickName);
  }

}
