import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { UpdateConfirmationCommand } from 'src/domain/business/slices/authentication/commands';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';
import { ConfirmationNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(UpdateConfirmationCommand)
export class UpdateConfirmationHandler implements ICommandHandler<UpdateConfirmationCommand> {

  constructor(private readonly repository: ConfirmationRepository) {}

  async execute(command: UpdateConfirmationCommand): Promise<Confirmation> {
    const updateResult = await this.repository.updateById(command.id, command.confirmation);
    
    if (updateResult.affected === 0) {
      throw new ConfirmationNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}
