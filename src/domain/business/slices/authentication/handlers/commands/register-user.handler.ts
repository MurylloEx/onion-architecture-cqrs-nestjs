import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from 'src/domain/business/slices/user';
import { UserRegisteredEvent } from 'src/domain/business/slices/authentication/events';
import { RegisterUserCommand } from 'src/domain/business/slices/authentication/commands';
import { ConfirmationRepository } from 'src/domain/business/slices/authentication/repositories';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {

  constructor(
    private readonly eventBus: EventBus,
    private readonly userDomainService: UserDomainService,
    private readonly confirmationRepository: ConfirmationRepository
  ) {}

  async execute(command: RegisterUserCommand) {
    const hashedPassword = await hash(command.password, 10);

    const createdUser = await this.userDomainService.create(
      command.fullName,
      command.nickName,
      command.phone,
      command.email,
      hashedPassword,
      command.descriptor,
      command.pushToken,
      command.pictureBuffer
    );

    let isCodeAlreadyUsed = false;
    let confirmationCode = uuid();

    while (isCodeAlreadyUsed) {
      isCodeAlreadyUsed = await this.confirmationRepository.verifyIfExists(confirmationCode);
    }

    const createdConfirmation = await this.confirmationRepository.create(
      createdUser,
      confirmationCode
    );

    this.eventBus.publish(new UserRegisteredEvent(createdUser, createdConfirmation));

    return createdUser;
  }

}
