import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedModule } from './feed.module';
import { UserModule } from './user.module';

import { 
  CreateCommentaryByPostHandler,
  FetchCommentariesByPostHandler
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
    TypeOrmModule.forFeature([Commentary])
  ],
  providers: [
    CreateCommentaryByPostHandler,
    FetchCommentariesByPostHandler,
    CommentaryRepository,
    CommentaryDomainService
  ],
  exports: [CommentaryDomainService]
})
export class CommentaryModule { }
