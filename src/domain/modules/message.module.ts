import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  CreateMessageHandler, 
  FetchMessagesHandler, 
  MessageCreatedHandler, 
  MessageRepository, 
  MessageService, 
  Message, 
} from 'src/domain/slices';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Message])
  ],
  providers: [
    CreateMessageHandler,
    MessageCreatedHandler,
    FetchMessagesHandler,
    MessageService,
    MessageRepository,
  ],
  exports: [MessageService]
})
export class MessageModule {}
