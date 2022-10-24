import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Message } from 'src/domain/business/slices/message/models';
import { MessageUpdatedEvent } from 'src/domain/business/slices/message/events';
import { UpdateMessageCommand } from 'src/domain/business/slices/message/commands';
import { MessageRepository } from 'src/domain/business/slices/message/repositories';

@CommandHandler(UpdateMessageCommand)
export class UpdateMessageHandler implements ICommandHandler<UpdateMessageCommand> {

  constructor(
    private repository: MessageRepository,
    private eventBus: EventBus
  ) {}

  async execute(command: UpdateMessageCommand): Promise<Message> {
    console.log('Command called:', command);

    const message = await this.repository.fetchById(command.id);
    const updateResult = await this.repository.updateById(command.id, command.message);

    if (updateResult.affected > 0) {
      this.eventBus.publish(new MessageUpdatedEvent(command.id, message));
    }

    return message;
  }

}
