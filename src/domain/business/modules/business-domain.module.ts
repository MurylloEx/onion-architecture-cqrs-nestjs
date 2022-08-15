import { Module } from '@nestjs/common';
import { BucketModule } from './bucket.module';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    BucketModule,
    MessageModule,
    LoggingModule,
    UserModule
  ],
  exports: [
    BucketModule,
    MessageModule,
    LoggingModule,
    UserModule
  ]
})
export class BusinessDomainModule { }
