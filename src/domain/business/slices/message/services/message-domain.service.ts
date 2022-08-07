import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import { Message } from 'src/domain/business/slices/message/models';

import { 
  FetchMessagesQuery, 
  FetchOneMessageQuery 
} from 'src/domain/business/slices/message/queries';

import { 
  CreateMessageCommand, 
  DeleteMessageCommand, 
  UpdateMessageCommand 
} from 'src/domain/business/slices/message/commands';

@Injectable()
export class MessageDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  fetch() {
    const query = new FetchMessagesQuery();
    return this.queryBus.execute<IQuery, Message[]>(query);
  }

  fetchById(id: string) {
    const query = new FetchOneMessageQuery(id);
    return this.queryBus.execute<IQuery, Message>(query);
  }

  create(title: string, description: string) {
    const command = new CreateMessageCommand(title, description);
    return this.commandBus.execute<ICommand, Message>(command);
  }

  updateById(id: string, message: Partial<Message>) {
    const command = new UpdateMessageCommand(id, message);
    return this.commandBus.execute<ICommand, Message>(command);
  }

  deleteById(id: string) {
    const command = new DeleteMessageCommand(id);
    return this.commandBus.execute<ICommand, Message>(command);
  }

}
