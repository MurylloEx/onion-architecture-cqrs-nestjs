import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationDomainModule, ConfigurationDomainService } from 'src/domain/config';
import {
  AuthenticateUserHandler,
  ChangePasswordHandler,
  ConfirmAccountHandler,
  CreateAuthenticationHandler,
  CreateConfirmationHandler,
  CreateRecoveryHandler,
  DeleteAuthenticationHandler,
  DeleteConfirmationHandler,
  DeleteRecoveryHandler,
  FetchAuthenticationsHandler,
  FetchConfirmationsHandler,
  FetchOneAuthenticationHandler,
  FetchOneConfirmationHandler,
  FetchOneRecoveryHandler,
  FetchRecoveriesHandler,
  RegisterUserHandler,
  RequestRecoveryCodeHandler,
  UpdateAuthenticationHandler,
  UpdateConfirmationHandler,
  UpdateRecoveryHandler,
  UserRegisteredHandler,
  RecoveryCodeRequestedHandler,
  CheckRecoveryCodeHandler
} from 'src/domain/business/slices/authentication';

import {
  AuthenticationRepository,
  ConfirmationRepository,
  RecoveryRepository,
  JwtDomainService
} from 'src/domain/business/slices/authentication';

import {
  AuthenticationDomainService,
  ConfirmationDomainService,
  RecoveryDomainService
} from 'src/domain/business/slices/authentication';

import {
  Authentication,
  Confirmation,
  Recovery
} from 'src/domain/business/slices/authentication';

import { UserModule } from './user.module';
import { BucketModule } from './bucket.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    BucketModule,
    NotificationModule,
    ConfigurationDomainModule,
    TypeOrmModule.forFeature([
      Authentication,
      Confirmation,
      Recovery
    ]),
    JwtModule.registerAsync({
      imports: [ConfigurationDomainModule],
      useFactory: (configService: ConfigurationDomainService) => configService.configureJwt(),
      inject: [ConfigurationDomainService]
    })
  ],
  providers: [
    AuthenticateUserHandler,
    ChangePasswordHandler,
    ConfirmAccountHandler,
    CreateAuthenticationHandler,
    CreateConfirmationHandler,
    CreateRecoveryHandler,
    DeleteAuthenticationHandler,
    DeleteConfirmationHandler,
    DeleteRecoveryHandler,
    RegisterUserHandler,
    RequestRecoveryCodeHandler,
    UpdateAuthenticationHandler,
    UpdateConfirmationHandler,
    UpdateRecoveryHandler,
    FetchAuthenticationsHandler,
    FetchConfirmationsHandler,
    FetchRecoveriesHandler,
    FetchOneAuthenticationHandler,
    FetchOneConfirmationHandler,
    FetchOneRecoveryHandler,
    CheckRecoveryCodeHandler,
    UserRegisteredHandler,
    RecoveryCodeRequestedHandler,
    AuthenticationRepository,
    ConfirmationRepository,
    RecoveryRepository,
    AuthenticationDomainService,
    ConfirmationDomainService,
    RecoveryDomainService,
    JwtDomainService
  ],
  exports: [
    AuthenticationDomainService,
    ConfirmationDomainService,
    RecoveryDomainService,
    JwtDomainService
  ]
})
export class AuthenticationModule { }
