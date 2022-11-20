import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { NotificationModule } from './notification.module';
import { AuthenticationModule } from './authentication.module';

@Module({
  imports: [
    UserModule,
    LoggingModule,
    MessageModule,
    NotificationModule,
    AuthenticationModule
  ],
  exports: [
    UserModule,
    LoggingModule,
    MessageModule,
    NotificationModule,
    AuthenticationModule
  ]
})
export class BusinessDomainModule { }
