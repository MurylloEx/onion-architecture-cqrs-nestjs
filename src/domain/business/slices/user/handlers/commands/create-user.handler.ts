import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserCreatedEvent } from 'src/domain/business/slices/user/events';
import { CreateUserCommand } from 'src/domain/business/slices/user/commands';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const createdUser = await this.repository.create(
      command.fullName,
      command.nickName,
      command.phone,
      command.email,
      command.password,
      command.pushToken,
      command.pictureId
    );
    this.eventBus.publish(new UserCreatedEvent(createdUser.id, createdUser));
    
    return createdUser;
  }

}
