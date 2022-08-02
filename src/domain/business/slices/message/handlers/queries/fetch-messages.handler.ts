import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Message } from 'src/domain/business/slices/message/models';
import { FetchMessagesQuery } from 'src/domain/business/slices/message/queries';
import { MessageRepository } from 'src/domain/business/slices/message/repositories';

@QueryHandler(FetchMessagesQuery)
export class FetchMessagesHandler implements IQueryHandler<FetchMessagesQuery> {

  constructor(private repository: MessageRepository) {}

  async execute(query: FetchMessagesQuery): Promise<Message[]> {
    console.log('Query has been called:', query);
    
    return await this.repository.fetch();
  }

}
