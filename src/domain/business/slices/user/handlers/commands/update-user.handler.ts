import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserUpdatedEvent } from 'src/domain/business/slices/user/events';
import { UpdateUserCommand } from 'src/domain/business/slices/user/commands';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {

  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const updatedUser = await this.repository.updateById(
      command.id,
      command.user
    );
    
    const user = await this.repository.fetchById(command.id);

    if (updatedUser.affected > 0) {
      this.eventBus.publish(new UserUpdatedEvent(command.id, user));
    }

    return user;
  }

}
