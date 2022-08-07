import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageUpdatedEvent } from 'src/domain/business/slices/message/events';

@EventsHandler(MessageUpdatedEvent)
export class MessageUpdatedHandler implements IEventHandler<MessageUpdatedEvent> {

  handle(event: MessageUpdatedEvent) {
    console.log('[MESSAGE UPDATED] An event has been occurred:', event);
  }

}
