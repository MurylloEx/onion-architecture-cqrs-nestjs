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
    userName: string,
    nickName: string,
    phone: string,
    email: string,
    password: string,
    descriptor: number,
    pushToken: string,
    pictureId: string
  ) {
    const command = new CreateUserCommand(
      userName,
      nickName,
      phone,
      email,
      password,
      descriptor,
      pushToken,
      pictureId
    );
    return this.commandBus.execute<ICommand, User>(command);
  }

  updateById(id: string, user: Partial<User>) {
    const command = new UpdateUserCommand(id, user);
    return this.commandBus.execute<ICommand, User>(command);
  }

  deleteById(id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute<ICommand, User>(command);
  }

}
