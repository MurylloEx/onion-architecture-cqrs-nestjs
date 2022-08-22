import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication.module';
import { BucketModule } from './bucket.module';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    AuthenticationModule,
    BucketModule,
    MessageModule,
    LoggingModule,
    UserModule
  ],
  exports: [
    AuthenticationModule,
    BucketModule,
    MessageModule,
    LoggingModule,
    UserModule
  ]
})
export class BusinessDomainModule { }
