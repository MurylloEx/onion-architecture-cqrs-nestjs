import { generate } from 'generate-password';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { Recovery } from 'src/domain/business/slices/authentication/models';
import { RecoveryRepository } from 'src/domain/business/slices/authentication/repositories';
import { RecoveryRequestedCodeEvent } from 'src/domain/business/slices/authentication/events';
import { RequestRecoveryCodeCommand } from 'src/domain/business/slices/authentication/commands';

@CommandHandler(RequestRecoveryCodeCommand)
export class RequestRecoveryCodeHandler implements ICommandHandler<RequestRecoveryCodeCommand> {

  constructor(
    private readonly eventBus: EventBus,
    private readonly repository: RecoveryRepository,
    private readonly userDomainService: UserDomainService
  ) { }

  async execute(command: RequestRecoveryCodeCommand): Promise<Recovery> {
    const user = await this.userDomainService.fetchByEmail(command.userEmail);

    await this.repository.deleteByUserId(user.id);

    let isCodeAlreadyUsed = false;
    let recoveryCode = generate({
      length: 4,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      strict: true,
      excludeSimilarCharacters: true
    });

    while (isCodeAlreadyUsed) {
      isCodeAlreadyUsed = await this.repository.verifyIfExists(recoveryCode);
    }

    const createdRecovery = await this.repository.create(user, recoveryCode);

    this.eventBus.publish(new RecoveryRequestedCodeEvent(user, createdRecovery));

    return createdRecovery;
  }

}
