import { Module } from '@nestjs/common';
import { MessageModule } from './message.module';

@Module({
  imports: [
    MessageModule
  ],
  exports: [
    MessageModule
  ]
})
export class BusinessDomainModule { }
