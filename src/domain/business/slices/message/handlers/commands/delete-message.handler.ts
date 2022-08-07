import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Message } from 'src/domain/business/slices/message/models';
import { MessageDeletedEvent } from 'src/domain/business/slices/message/events';
import { DeleteMessageCommand } from 'src/domain/business/slices/message/commands';
import { MessageRepository } from 'src/domain/business/slices/message/repositories';

@CommandHandler(DeleteMessageCommand)
export class DeleteMessageHandler implements ICommandHandler<DeleteMessageCommand> {

  constructor(
    private repository: MessageRepository,
    private eventBus: EventBus
  ) {}

  async execute(command: DeleteMessageCommand): Promise<Message> {
    console.log('Command called:', command);

    const message = await this.repository.fetchById(command.id);
    const deleteResult = await this.repository.deleteById(command.id);

    if (deleteResult.affected > 0) {
      this.eventBus.publish(new MessageDeletedEvent(command.id, message));
    }

    return message;
  }

}
