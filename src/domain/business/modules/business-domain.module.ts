import { Module } from '@nestjs/common';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    MessageModule,
    LoggingModule,
    UserModule
  ],
  exports: [
    MessageModule,
    LoggingModule,
    UserModule
  ]
})
export class BusinessDomainModule { }
