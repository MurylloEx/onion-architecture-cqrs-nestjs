import { Module } from '@nestjs/common';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';

@Module({
  imports: [
    MessageModule,
    LoggingModule
  ],
  exports: [
    MessageModule,
    LoggingModule
  ]
})
export class BusinessDomainModule { }
