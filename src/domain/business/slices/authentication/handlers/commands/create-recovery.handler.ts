import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { Recovery } from 'src/domain/business/slices/authentication/models';
import { CreateRecoveryCommand } from 'src/domain/business/slices/authentication/commands';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';

@CommandHandler(CreateRecoveryCommand)
export class CreateRecoveryHandler implements ICommandHandler<CreateRecoveryCommand> {

  constructor(
    private readonly repository: RecoveryRepository,
    private readonly userDomainService: UserDomainService
  ) {}

  async execute(command: CreateRecoveryCommand): Promise<Recovery> {
    const user = await this.userDomainService.fetchById(command.userId);
    return await this.repository.create(user, command.code);
  }

}
