import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { DeleteConfirmationCommand } from 'src/domain/business/slices/authentication/commands';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';
import { ConfirmationNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(DeleteConfirmationCommand)
export class DeleteConfirmationHandler implements ICommandHandler<DeleteConfirmationCommand> {

  constructor(private readonly repository: ConfirmationRepository) {}

  async execute(command: DeleteConfirmationCommand): Promise<Confirmation> {
    const updateResult = await this.repository.deleteById(command.id);

    if (updateResult.affected === 0) {
      throw new ConfirmationNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}
