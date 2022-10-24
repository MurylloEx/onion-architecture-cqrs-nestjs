import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Message } from 'src/domain/business/slices/message/models';
import { FetchOneMessageQuery } from 'src/domain/business/slices/message/queries';
import { MessageRepository } from 'src/domain/business/slices/message/repositories';

@QueryHandler(FetchOneMessageQuery)
export class FetchOneMessageHandler implements IQueryHandler<FetchOneMessageQuery> {

  constructor(private repository: MessageRepository) {}

  async execute(query: FetchOneMessageQuery): Promise<Message> {
    console.log('Query has been called:', query);
    
    return await this.repository.fetchById(query.id);
  }

}
