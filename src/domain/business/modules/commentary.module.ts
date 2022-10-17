import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedModule } from './feed.module';
import { UserModule } from './user.module';
import { NotificationModule } from './notification.module';

import { 
  CommentaryCreatedHandler,
  CreateCommentaryByPostHandler,
  FetchCommentariesByPostHandler,
  FetchCommentariesByPeriodAndPostHandler
} from 'src/domain/business/slices/commentary';

import { 
  Commentary, 
  CommentaryDomainService, 
  CommentaryRepository
} from 'src/domain/business/slices/commentary';

@Module({
  imports: [
    CqrsModule,
    FeedModule,
    UserModule,
    NotificationModule,
    TypeOrmModule.forFeature([Commentary])
  ],
  providers: [
    CommentaryCreatedHandler,
    CreateCommentaryByPostHandler,
    FetchCommentariesByPostHandler,
    FetchCommentariesByPeriodAndPostHandler,
    CommentaryRepository,
    CommentaryDomainService
  ],
  exports: [CommentaryDomainService]
})
export class CommentaryModule { }
