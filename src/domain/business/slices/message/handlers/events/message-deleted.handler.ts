import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageDeletedEvent } from 'src/domain/business/slices/message/events';

@EventsHandler(MessageDeletedEvent)
export class MessageDeletedHandler implements IEventHandler<MessageDeletedEvent> {

  handle(event: MessageDeletedEvent) {
    console.log('[MESSAGE DELETED] An event has been occurred:', event);
  }

}
