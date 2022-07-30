import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Message } from 'src/domain/slices/message/models';
import { FetchMessageQuery } from 'src/domain/slices/message/queries';
import { MessageRepository } from 'src/domain/slices/message/repositories';

@QueryHandler(FetchMessageQuery)
export class FetchMessagesHandler implements IQueryHandler<FetchMessageQuery> {

  constructor(private repository: MessageRepository) {}

  execute(query: FetchMessageQuery): Promise<Message[]> {
    console.log('Query has been called:', query);
    return this.repository.findAll();
  }

}
