import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication.module';
import { BucketModule } from './bucket.module';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    AuthenticationModule,
    BucketModule,
    MessageModule,
    LoggingModule,
    UserModule,
    NotificationModule
  ],
  exports: [
    AuthenticationModule,
    BucketModule,
    MessageModule,
    LoggingModule,
    UserModule,
    NotificationModule
  ]
})
export class BusinessDomainModule { }
