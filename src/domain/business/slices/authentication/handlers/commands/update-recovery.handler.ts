import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Recovery } from 'src/domain/business/slices/authentication/models';
import { UpdateRecoveryCommand } from 'src/domain/business/slices/authentication/commands';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';
import { RecoveryNotFoundDomainException } from 'src/domain/business/slices/authentication/exceptions';

@CommandHandler(UpdateRecoveryCommand)
export class UpdateRecoveryHandler implements ICommandHandler<UpdateRecoveryCommand> {

  constructor(private readonly repository: RecoveryRepository) {}

  async execute(command: UpdateRecoveryCommand): Promise<Recovery> {
    const updateResult = await this.repository.updateById(command.id, command.recovery);
    
    if (updateResult.affected === 0) {
      throw new RecoveryNotFoundDomainException();
    }

    return await this.repository.fetchById(command.id);
  }

}
