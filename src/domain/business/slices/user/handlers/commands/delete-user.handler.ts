import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { User } from 'src/domain/business/slices/user/models';
import { UserDeletedEvent } from 'src/domain/business/slices/user/events';
import { DeleteUserCommand } from 'src/domain/business/slices/user/commands';
import { UserRepository } from 'src/domain/business/slices/user/repositories';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const user = await this.repository.fetchById(command.id);
    const deleteResult = await this.repository.deleteById(command.id);

    if (deleteResult.affected > 0) {
      this.eventBus.publish(new UserDeletedEvent(command.id, user));
    }

    return user;
  }

}
