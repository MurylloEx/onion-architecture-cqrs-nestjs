import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationDomainModule } from 'src/domain/config';

import { 
  Logging, 
  LoggingDomainService 
} from 'src/domain/business/slices/logging';

import { 
  CreateLoggingHandler, 
  FetchLoggingsHandler, 
  DiscordLoggingDomainService, 
  LoggingRepository 
} from 'src/domain/business/slices/logging';

@Module({
  imports: [
    CqrsModule,
    ConfigurationDomainModule,
    TypeOrmModule.forFeature([Logging])
  ],
  providers: [
    CreateLoggingHandler,
    FetchLoggingsHandler,
    LoggingRepository,
    LoggingDomainService,
    DiscordLoggingDomainService
  ],
  exports: [
    LoggingDomainService,
    DiscordLoggingDomainService
  ]
})
export class LoggingModule { }
