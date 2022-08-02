import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';

import { CachingModule } from './caching.module';
import { DatabaseModule } from './database.module';
import { ServicesModule } from './services.module';
import { SecurityModule } from './security.module';

@Module({
  imports: [
    DatabaseModule,
    ServicesModule,
    DomainModule,
    CachingModule,
    SecurityModule
  ],
  exports: [
    DatabaseModule,
    ServicesModule,
    DomainModule,
    CachingModule,
    SecurityModule
  ]
})
export class CommonModule {}
