import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConfigurationDomainService } from 'src/domain/config';
import { UserRegisteredEvent } from 'src/domain/business/slices/authentication/events';
import { EmailNotificationDomainService } from 'src/domain/business/slices/notification';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler implements IEventHandler<UserRegisteredEvent> {

  constructor(
    private readonly configurationDomainService: ConfigurationDomainService,
    private readonly notificationDomainService: EmailNotificationDomainService
  ) {}

  handle(event: UserRegisteredEvent) {
    const server = this.configurationDomainService.server;

    const userId = event.user.id;
    const fullName = event.user.fullName;
    const code = event.confirmation.code;

    const confirmationUrl = `https://${server.host + server.globalPrefix}/authentication/confirm/${code}`;

    this.notificationDomainService.sendWelcomeEmail(userId, fullName, confirmationUrl);
  }

}
