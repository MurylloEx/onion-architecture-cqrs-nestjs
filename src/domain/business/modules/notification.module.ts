import { Module } from '@nestjs/common';

import { ConfigurationDomainModule } from 'src/domain/config';

import { 
  EmailNotificationDomainService, 
  PushNotificationDomainService 
} from 'src/domain/business/slices';

import { UserModule } from './user.module';
import { LoggingModule } from './logging.module';

@Module({
  imports: [
    UserModule,
    LoggingModule,
    ConfigurationDomainModule
  ],
  providers: [
    EmailNotificationDomainService,
    PushNotificationDomainService
  ],
  exports: [
    EmailNotificationDomainService,
    PushNotificationDomainService
  ]
})
export class NotificationModule { }
