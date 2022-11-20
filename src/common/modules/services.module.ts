import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import {
  AuthenticationService,
  ConfigurationService,
  ConfirmationService,
  LoggingService,
  MessageService,
  RecoveryService,
  UserService
} from 'src/common/services';

import { CachingModule } from './caching.module';
import { DatabaseModule } from './database.module';
import { SecurityModule } from './security.module';
import { ConfigurationModule } from './configuration.module';

@Module({
  imports: [
    DomainModule,
    CachingModule,
    DatabaseModule,
    SecurityModule,
    ConfigurationModule
  ],
  providers: [
    AuthenticationService,
    ConfigurationService,
    ConfirmationService,
    LoggingService,
    MessageService,
    RecoveryService,
    UserService
  ],
  exports: [
    AuthenticationService,
    ConfigurationService,
    ConfirmationService,
    LoggingService,
    MessageService,
    RecoveryService,
    UserService
  ]
})
export class ServicesModule { }
