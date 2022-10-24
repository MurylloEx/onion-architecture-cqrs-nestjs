import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Authentication } from 'src/domain/business/slices/authentication/models';
import { DeleteAuthenticationCommand } from 'src/domain/business/slices/authentication/commands';
import { AuthenticationRepository } from 'src/domain/business/slices/authentication/repositories';
import { AuthenticationNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(DeleteAuthenticationCommand)
export class DeleteAuthenticationHandler implements ICommandHandler<DeleteAuthenticationCommand> {

  constructor(private readonly repository: AuthenticationRepository) {}

  async execute(command: DeleteAuthenticationCommand): Promise<Authentication> {
    const updateResult = await this.repository.deleteById(command.id);

    if (updateResult.affected === 0) {
      throw new AuthenticationNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}
