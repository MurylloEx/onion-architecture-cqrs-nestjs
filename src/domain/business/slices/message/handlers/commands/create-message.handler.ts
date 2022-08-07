import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Message } from 'src/domain/business/slices/message/models';
import { MessageCreatedEvent } from 'src/domain/business/slices/message/events';
import { CreateMessageCommand } from 'src/domain/business/slices/message/commands';
import { MessageRepository } from 'src/domain/business/slices/message/repositories';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {

  constructor(
    private repository: MessageRepository,
    private eventBus: EventBus
  ) {}

  async execute(command: CreateMessageCommand): Promise<Message> {
    console.log('Command called:', command);

    const createdMessage = await this.repository.create(command.title, command.description);
    this.eventBus.publish(new MessageCreatedEvent(createdMessage.id, createdMessage));
    
    return createdMessage;
  }

}
