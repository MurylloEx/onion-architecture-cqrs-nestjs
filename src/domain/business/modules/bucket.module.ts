import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationDomainModule } from 'src/domain/config';
import {
  Bucket,
  BucketRepository,
  BucketDomainService,
  ImgurBucketDomainService,
} from 'src/domain/business/slices/bucket';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Bucket]),
    ConfigurationDomainModule,
  ],
  providers: [
    BucketRepository,
    BucketDomainService,
    ImgurBucketDomainService
  ],
  exports: [BucketDomainService]
})
export class BucketModule { }
