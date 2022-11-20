import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';

import {
  FetchUsersQuery,
  FetchOneUserQuery,
  FetchOneUserByEmailQuery,
  FetchOneUserByNickNameQuery,
  FetchOneUserByRecoveryCodeQuery,
  VerifyIfUserExistsByEmailOrNickNameQuery
} from 'src/domain/business/slices/user/queries';

import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  UpdateUserProfileCommand,
} from 'src/domain/business/slices/user/commands';

import { User } from 'src/domain/business/slices/user/models';

@Injectable()
export class UserDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  fetch(options?: FindManyOptions<User>): Promise<User[]> {
    const query = new FetchUsersQuery(options);
    return this.queryBus.execute<IQuery, User[]>(query);
  }

  fetchById(id: string): Promise<User> {
    const query = new FetchOneUserQuery(id);
    return this.queryBus.execute<IQuery, User>(query);
  }

  fetchByEmail(email: string): Promise<User> {
    const query = new FetchOneUserByEmailQuery(email);
    return this.queryBus.execute<IQuery, User>(query);
  }

  fetchByNickName(nickName: string): Promise<User> {
    const query = new FetchOneUserByNickNameQuery(nickName);
    return this.queryBus.execute<IQuery, User>(query);
  }

  fetchByRecoveryCode(code: string) {
    const query = new FetchOneUserByRecoveryCodeQuery(code);
    return this.queryBus.execute<IQuery, User>(query);
  }

  verifyIfExists(email: string, nickName: string): Promise<boolean> {
    const query = new VerifyIfUserExistsByEmailOrNickNameQuery(email, nickName);
    return this.queryBus.execute<IQuery, boolean>(query);
  }

  create(
    fullName: string,
    nickName: string,
    phone: string,
    email: string,
    password: string,
    permissions: string,
    pushToken: string
  ) {
    const command = new CreateUserCommand(
      fullName,
      nickName,
      phone,
      email,
      password,
      permissions,
      pushToken
    );
    return this.commandBus.execute<ICommand, User>(command);
  }

  updateById(id: string, user: Partial<User>): Promise<User> {
    const command = new UpdateUserCommand(id, user);
    return this.commandBus.execute<ICommand, User>(command);
  }

  updateProfileById(
    id: string,
    fullName?: string,
    nickName?: string,
    phone?: string,
    email?: string
  ) {
    const command = new UpdateUserProfileCommand(
      id,
      fullName,
      nickName,
      phone,
      email
    );
    return this.commandBus.execute<ICommand, User>(command);
  }

  deleteById(id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute<ICommand, User>(command);
  }

}
