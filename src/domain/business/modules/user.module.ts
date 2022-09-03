import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { 
  CreateUserHandler,
  DeleteUserHandler,
  FetchUserHandler, 
  FetchOneUserHandler,
  UpdateUserHandler,
  FetchOneUserByEmailHandler,
  FetchOneUserByNickNameHandler,
  FetchOneUserByRecoveryCodeQuery,
  VerifyIfUserExistsByEmailOrNickNameHandler,
  FetchOneUserByRecoveryCodeHandler
} from 'src/domain/business/slices/user';

import { 
  UserCreatedEventHandler, 
  UserDeletedEventHandler, 
  UserUpdatedEventHandler,
} from 'src/domain/business/slices/user';

import { 
  User, 
  UserDomainService, 
  UserRepository,
} from 'src/domain/business/slices/user';

@Module({
  imports: [
    CqrsModule,
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
