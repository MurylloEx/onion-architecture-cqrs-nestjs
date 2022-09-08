import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { 
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  FetchUserHandler, 
  FetchOneUserHandler,
  FetchOneUserByEmailHandler,
  FetchOneUserByNickNameHandler,
  FetchOneUserByRecoveryCodeQuery,
  FetchOneUserByRecoveryCodeHandler,
  VerifyIfUserExistsByEmailOrNickNameHandler,
} from 'src/domain/business/slices/user';

import { 
  UserCreatedEventHandler, 
  UserDeletedEventHandler, 
  UserUpdatedEventHandler,
  UpdateUserProfileHandler
} from 'src/domain/business/slices/user';

import { 
  User, 
  UserDomainService, 
  UserRepository,
} from 'src/domain/business/slices/user';

import { BucketModule } from './bucket.module';

@Module({
  imports: [
    CqrsModule,
    BucketModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    CreateUserHandler,
    FetchOneUserHandler,
    FetchUserHandler,
    FetchOneUserByEmailHandler,
    FetchOneUserByNickNameHandler,
    FetchOneUserByRecoveryCodeQuery,
    FetchOneUserByRecoveryCodeHandler,
    VerifyIfUserExistsByEmailOrNickNameHandler,
    UpdateUserHandler,
    UpdateUserProfileHandler,
    DeleteUserHandler,
    UserCreatedEventHandler,
    UserDeletedEventHandler,
    UserUpdatedEventHandler,
    UserRepository,
    UserDomainService
  ],
  exports: [UserDomainService]
})
export class UserModule { }
