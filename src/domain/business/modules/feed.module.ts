import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetModule } from './pet.module';
import { UserModule } from './user.module';
import { BucketModule } from './bucket.module';

import {
  CreatePostHandler,
  DeletePostHandler,
  ReportPostHandler,
  UpdatePostHandler
} from 'src/domain/business/slices/feed';

import {
  FetchPostFilterRulesHandler,
  FetchOnePostHandler,
  FetchPostsHandler
} from 'src/domain/business/slices/feed';

import {
  Post,
  PostFilterRule,
  PostRepository,
  PostFilterRuleRepository,
  PostDomainService,
} from 'src/domain/business/slices/feed';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    PetModule,
    BucketModule,
    TypeOrmModule.forFeature([Post, PostFilterRule])
  ],
  providers: [
    CreatePostHandler,
    DeletePostHandler,
    ReportPostHandler,
    UpdatePostHandler,
    FetchPostFilterRulesHandler,
    FetchOnePostHandler,
    FetchPostsHandler,
    PostRepository,
    PostFilterRuleRepository,
    PostDomainService
  ],
  exports: [PostDomainService]
})
export class FeedModule { }
