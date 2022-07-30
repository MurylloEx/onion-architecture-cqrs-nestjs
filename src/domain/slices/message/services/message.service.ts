import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';

import { Message } from 'src/domain/slices/message/models';
import { FetchMessageQuery } from 'src/domain/slices/message/queries';
import { MessageCreatedEvent } from 'src/domain/slices/message/events';
import { CreateMessageCommand } from 'src/domain/slices/message/commands';

@Injectable()
export class MessageService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  create(title: string, description: string) {
    this.commandBus.execute<ICommand>(
      new CreateMessageCommand(title, description));
    this.eventBus.publish(new MessageCreatedEvent(title, description));
  }

  fetchAll() {
    return this.queryBus.execute<IQuery, Message[]>(
      new FetchMessageQuery());
  }

}
