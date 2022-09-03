import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailNotificationDomainService } from 'src/domain/business/slices/notification';
import { RecoveryRequestedCodeEvent } from 'src/domain/business/slices/authentication/events';

@EventsHandler(RecoveryRequestedCodeEvent)
export class RecoveryCodeRequestedHandler implements IEventHandler<RecoveryRequestedCodeEvent> {

  constructor(
    private readonly notificationDomainService: EmailNotificationDomainService,
  ) {}

  handle(event: RecoveryRequestedCodeEvent) {
    this.notificationDomainService.sendRecoveryEmail(
      event.user.id, 
      event.user.fullName, 
      event.recovery.code
    );
  }

}
