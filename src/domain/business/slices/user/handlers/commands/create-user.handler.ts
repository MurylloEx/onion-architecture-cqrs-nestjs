import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserCreatedEvent } from 'src/domain/business/slices/user/events';
import { CreateUserCommand } from 'src/domain/business/slices/user/commands';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

import {
  UserEmailAlreadyExistsDomainException,
  UserNickNameAlreadyExistsDomainException
} from 'src/domain/business/slices/user/exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) { }

  async execute(command: CreateUserCommand): Promise<User> {
    const availability = await this.repository.verifyUserAvailability(
      command.email ?? '',
      command.nickName ?? ''
    );

    if (!availability.emailAvailable) {
      throw new UserEmailAlreadyExistsDomainException();
    }

    if (!availability.nickNameAvailable) {
      throw new UserNickNameAlreadyExistsDomainException();
    }

    const createdUser = await this.repository.create(
      command.fullName,
      command.nickName,
      command.phone,
      command.email,
      command.password,
      command.permissions,
      command.pushToken
    );

    this.eventBus.publish(new UserCreatedEvent(createdUser.id, createdUser));

    return createdUser;
  }

}
