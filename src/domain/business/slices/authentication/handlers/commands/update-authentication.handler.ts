import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Authentication } from 'src/domain/business/slices/authentication/models';
import { UpdateAuthenticationCommand } from 'src/domain/business/slices/authentication/commands';
import { AuthenticationRepository } from 'src/domain/business/slices/authentication/repositories';
import { AuthenticationNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(UpdateAuthenticationCommand)
export class UpdateAuthenticationHandler implements ICommandHandler<UpdateAuthenticationCommand> {

  constructor(private readonly repository: AuthenticationRepository) {}

  async execute(command: UpdateAuthenticationCommand): Promise<Authentication> {
    const updateResult = await this.repository.updateById(command.id, command.authentication);
    
    if (updateResult.affected === 0) {
      throw new AuthenticationNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}
