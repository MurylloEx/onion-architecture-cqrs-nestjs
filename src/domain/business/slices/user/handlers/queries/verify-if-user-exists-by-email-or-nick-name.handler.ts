import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository } from 'src/domain/business/slices/user/repositories';
import { VerifyIfUserExistsByEmailOrNickNameQuery } from 'src/domain/business/slices/user/queries';

@QueryHandler(VerifyIfUserExistsByEmailOrNickNameQuery)
export class VerifyIfUserExistsByEmailOrNickNameHandler implements IQueryHandler<VerifyIfUserExistsByEmailOrNickNameQuery> {

  constructor(private readonly repository: UserRepository) {}

  async execute(query: VerifyIfUserExistsByEmailOrNickNameQuery): Promise<boolean> {
    const { emailAvailable, nickNameAvailable } = await this.repository.verifyUserAvailability(
      query.userEmail, 
      query.userNickName
    );

    return emailAvailable && nickNameAvailable;
  }

}
