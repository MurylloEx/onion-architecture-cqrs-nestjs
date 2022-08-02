import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageCreatedEvent } from 'src/domain/business/slices/message/events';

@EventsHandler(MessageCreatedEvent)
export class MessageCreatedHandler implements IEventHandler<MessageCreatedEvent> {

  handle(event: MessageCreatedEvent) {
    console.log('[MESSAGE CREATED] An event has been occurred:', event);
  }

}
