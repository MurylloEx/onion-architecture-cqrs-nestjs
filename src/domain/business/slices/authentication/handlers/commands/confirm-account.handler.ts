import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { ConfirmAccountCommand } from 'src/domain/business/slices/authentication/commands';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';

@CommandHandler(ConfirmAccountCommand)
export class ConfirmAccountHandler implements ICommandHandler<ConfirmAccountCommand> {

  constructor(private readonly repository: ConfirmationRepository) {}

  async execute(command: ConfirmAccountCommand): Promise<Confirmation> {
    const confirmation = await this.repository.fetchByCode(command.code);
    await this.repository.deleteById(confirmation.id);

    return confirmation;
  }

}
