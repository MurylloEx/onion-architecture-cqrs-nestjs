import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RecoveryRequestedCodeEvent } from 'src/domain/business/slices/authentication/events';

@EventsHandler(RecoveryRequestedCodeEvent)
export class RecoveryCodeRequestedHandler implements IEventHandler<RecoveryRequestedCodeEvent> {

  handle(event: RecoveryRequestedCodeEvent) {
    console.log('[RECOVERY REQUESTED] An event has been occurred:', event);
  }

}
