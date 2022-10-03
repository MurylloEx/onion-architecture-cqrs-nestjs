import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import {
  AuthenticationService,
  BucketService,
  ConfigurationService,
  ConfirmationService,
  EstablishmentService,
  LoggingService,
  MessageService,
  PetService,
  PostService,
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
    BucketService,
    ConfigurationService,
    ConfirmationService,
    EstablishmentService,
    LoggingService,
    MessageService,
    PetService,
    PostService,
    RecoveryService,
    UserService
  ],
  exports: [
    AuthenticationService,
    BucketService,
    ConfigurationService,
    ConfirmationService,
    EstablishmentService,
    LoggingService,
    MessageService,
    PetService,
    PostService,
    RecoveryService,
    UserService
  ]
})
export class ServicesModule { }
