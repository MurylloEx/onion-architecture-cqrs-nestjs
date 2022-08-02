import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateMessageHandler,
  FetchMessagesHandler,
  FetchOneMessageHandler,
  UpdateMessageHandler,
  DeleteMessageHandler,
} from 'src/domain/business/slices/message';

import {
  MessageCreatedHandler,
  MessageDeletedHandler,
  MessageUpdatedHandler,
} from 'src/domain/business/slices/message';

import {
  MessageRepository,
  MessageService,
  Message,
} from 'src/domain/business/slices/message';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Message])
  ],
  providers: [
    CreateMessageHandler,
    FetchMessagesHandler,
    FetchOneMessageHandler,
    UpdateMessageHandler,
    DeleteMessageHandler,
    MessageCreatedHandler,
    MessageDeletedHandler,
    MessageUpdatedHandler,
    MessageRepository,
    MessageService
  ],
  exports: [MessageService]
})
export class MessageModule { }
