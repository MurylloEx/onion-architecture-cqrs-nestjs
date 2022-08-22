import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from 'src/domain/business/slices/authentication/events';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler implements IEventHandler<UserRegisteredEvent> {

  handle(event: UserRegisteredEvent) {
    console.log('[USER REGISTERED] An event has been occurred:', event);
  }

}
