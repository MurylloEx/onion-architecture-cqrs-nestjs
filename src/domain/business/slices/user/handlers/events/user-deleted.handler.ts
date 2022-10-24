import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDeletedEvent } from 'src/domain/business/slices/user/events';

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler implements IEventHandler<UserDeletedEvent> {
  async handle(event: UserDeletedEvent) {}
}
