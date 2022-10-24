import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { Confirmation } from 'src/domain/business/slices/authentication/models';
import { CreateConfirmationCommand } from 'src/domain/business/slices/authentication/commands';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';

@CommandHandler(CreateConfirmationCommand)
export class CreateConfirmationHandler implements ICommandHandler<CreateConfirmationCommand> {

  constructor(
    private readonly repository: ConfirmationRepository,
    private readonly userDomainService: UserDomainService
  ) {}

  async execute(command: CreateConfirmationCommand): Promise<Confirmation> {
    const user = await this.userDomainService.fetchById(command.userId);
    return await this.repository.create(user, command.code);
  }

}
