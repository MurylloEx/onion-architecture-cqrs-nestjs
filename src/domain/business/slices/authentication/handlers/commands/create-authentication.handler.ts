import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { Authentication } from 'src/domain/business/slices/authentication/models';
import { CreateAuthenticationCommand } from 'src/domain/business/slices/authentication/commands';
import { AuthenticationRepository } from 'src/domain/business/slices/authentication/repositories';

@CommandHandler(CreateAuthenticationCommand)
export class CreateAuthenticationHandler implements ICommandHandler<CreateAuthenticationCommand> {

  constructor(
    private readonly repository: AuthenticationRepository,
    private readonly userDomainService: UserDomainService
  ) {}

  async execute(command: CreateAuthenticationCommand): Promise<Authentication> {
    const user = await this.userDomainService.fetchById(command.userId);

    return await this.repository.create(
      user, 
      command.ipAddress, 
      command.jwt
    );
  }

}
