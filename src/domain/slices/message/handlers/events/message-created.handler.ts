import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageCreatedEvent } from 'src/domain/slices/message/events';

@EventsHandler(MessageCreatedEvent)
export class MessageCreatedHandler implements IEventHandler<MessageCreatedEvent> {

  handle(event: MessageCreatedEvent) {
    console.log('An event has been occurred:', event);
  }

}