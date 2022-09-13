import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication.module';
import { NotificationModule } from './notification.module';
import { BucketModule } from './bucket.module';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';
import { PetModule } from './pet.module';

@Module({
  imports: [
    AuthenticationModule,
    BucketModule,
    MessageModule,
    LoggingModule,
    NotificationModule,
    PetModule,
    UserModule
  ],
  exports: [
    AuthenticationModule,
    BucketModule,
    MessageModule,
    LoggingModule,
    NotificationModule,
    PetModule,
    UserModule
  ]
})
export class BusinessDomainModule { }
