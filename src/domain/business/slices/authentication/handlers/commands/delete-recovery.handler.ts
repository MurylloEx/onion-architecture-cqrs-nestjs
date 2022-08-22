import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Recovery } from 'src/domain/business/slices/authentication/models';
import { DeleteRecoveryCommand } from 'src/domain/business/slices/authentication/commands';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';
import { RecoveryNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(DeleteRecoveryCommand)
export class DeleteRecoveryHandler implements ICommandHandler<DeleteRecoveryCommand> {

  constructor(private readonly repository: RecoveryRepository) {}

  async execute(command: DeleteRecoveryCommand): Promise<Recovery> {
    const updateResult = await this.repository.deleteById(command.id);

    if (updateResult.affected === 0) {
      throw new RecoveryNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}
